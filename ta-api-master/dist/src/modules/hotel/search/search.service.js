"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const providers_search_service_1 = require("../providers/providers-search.service");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
const date_utility_1 = require("../../../shared/utilities/flight/date.utility");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
const caching_utility_1 = require("../../../shared/utilities/common/caching.utility");
const uuid_1 = require("uuid");
let SearchService = SearchService_1 = class SearchService {
    providersSearchService;
    supplierCred;
    cachingUtility;
    logger = new common_1.Logger(SearchService_1.name);
    constructor(providersSearchService, supplierCred, cachingUtility) {
        this.providersSearchService = providersSearchService;
        this.supplierCred = supplierCred;
        this.cachingUtility = cachingUtility;
    }
    async searchInitiate(apiReqData, headers) {
        try {
            let roomsArray = apiReqData.searchCriteria.rooms;
            if (!Array.isArray(roomsArray)) {
                roomsArray = [roomsArray];
            }
            if (!roomsArray.some((room) => room.adults >= 1)) {
                throw new common_1.BadRequestException('ERR_ADULT_SHOULD_BE_ONE');
            }
            const providersData = await this.supplierCred.getActiveProviders(headers);
            const activeProviders = providersData.map((data) => ({
                providerId: data.provider_id,
                providerCredentials: typeof data.provider_credentials === 'string' ? JSON.parse(data.provider_credentials) : data.provider_credentials,
            }));
            Object.assign(apiReqData, { activeProviders: activeProviders });
            apiReqData['searchReqId'] = (0, uuid_1.v4)();
            const results = await this.providersSearchService.searchInitiate(apiReqData, headers);
            const sortedResults = this.applySorting(results, { by: apiReqData.sort.by || 'price', order: apiReqData.sort.order || 'asc' });
            const searchResponse = this.createCompleteResponse(sortedResults, apiReqData['searchReqId'], {
                ...apiReqData,
                page: 1,
                limit: apiReqData.searchSetting.pageLimit,
                sort: {
                    by: apiReqData.sort.by,
                    order: apiReqData.sort.order,
                },
            });
            const cacheData = {
                ...searchResponse,
                results: sortedResults,
            };
            await this.cachingUtility.setCachedDataBySearchReqId(apiReqData['searchReqId'], cacheData);
            return searchResponse;
        }
        catch (error) {
            this.logger.error('Hotel search initiation failed:', error);
            throw new Error(`Hotel search initiation failed: ${error.message}`);
        }
    }
    async searchCheckResults(searchCheckResultsRequest, headers) {
        try {
            const { searchReqId, sort } = searchCheckResultsRequest;
            const cachedData = await this.cachingUtility.getCachedDataBySearchReqId(searchReqId);
            if (!cachedData || !cachedData.data) {
                return this.createEmptyResponse(searchReqId, { page: 1, limit: searchCheckResultsRequest.searchSetting.pageLimit }, {}, sort, 'completed', 'No search results found or search results expired. Please perform a new search.');
            }
            let searchResponse;
            try {
                searchResponse = JSON.parse(cachedData.data);
            }
            catch (parseError) {
                return this.createEmptyResponse(searchReqId, { page: 1, limit: searchCheckResultsRequest.searchSetting.pageLimit }, {}, sort, 'expired', 'Your search session has expired. Please perform a new search.');
            }
            if (!searchResponse || !searchResponse.results || !Array.isArray(searchResponse.results)) {
                return this.createEmptyResponse(searchReqId, { page: 1, limit: searchCheckResultsRequest.searchSetting.pageLimit }, {}, sort, 'expired', 'Your search session has expired or is invalid. Please perform a new search.');
            }
            const sortedResults = this.applySorting(searchResponse.results, sort);
            const completeResponse = this.createCompleteResponse(sortedResults, searchReqId, {
                ...searchCheckResultsRequest,
                page: 1,
                limit: searchCheckResultsRequest.searchSetting.pageLimit,
                sort: {
                    by: sort.by,
                    order: sort.order,
                },
            });
            return completeResponse;
        }
        catch (error) {
            this.logger.error('Hotel search check results failed:', error);
            throw new Error(`Hotel search check results failed: ${error.message}`);
        }
    }
    async searchFiltration(filtrationRequest, headers) {
        try {
            const { searchReqId, sort, pagination } = filtrationRequest;
            let { filters } = filtrationRequest;
            const cachedData = await this.cachingUtility.getCachedDataBySearchReqId(searchReqId);
            if (!cachedData || !cachedData.data) {
                return this.createEmptyResponse(searchReqId, pagination, filters, sort, 'completed', 'No search results found or search results expired. Please perform a new search.');
            }
            let searchResponse;
            try {
                searchResponse = JSON.parse(cachedData.data);
            }
            catch (parseError) {
                return this.createEmptyResponse(searchReqId, pagination, filters, sort, 'expired', 'Your search session has expired. Please perform a new search.');
            }
            if (!searchResponse || !searchResponse.results || !Array.isArray(searchResponse.results)) {
                return this.createEmptyResponse(searchReqId, pagination, filters, sort, 'expired', 'Your search session has expired or is invalid. Please perform a new search.');
            }
            let allResults = [...searchResponse.results];
            if (!filters || typeof filters !== 'object') {
                filters = {};
            }
            let filteredResults = this.applyFilters(allResults, filters);
            filteredResults = this.applySorting(filteredResults, sort);
            const requestedPage = pagination.page || 1;
            const limit = pagination.limit || 20;
            const totalFilteredResults = filteredResults.length;
            const totalPages = Math.ceil(totalFilteredResults / limit) || 1;
            const page = Math.max(1, Math.min(requestedPage, totalPages));
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedResults = filteredResults.slice(startIndex, endIndex);
            const completeResponse = {
                searchReqId,
                status: 'completed',
                message: `Found ${totalFilteredResults} hotels matching your criteria`,
                timestamp: date_utility_1.DateUtility.toISOString(),
                totalResults: allResults.length,
                location: { lat: searchResponse.location.lat, lon: searchResponse.location.lon },
                radiusKm: searchResponse.radiusKm,
                facets: searchResponse.facets,
                pagination: {
                    page: page,
                    limit: limit,
                    totalPages: totalPages,
                    totalFilteredResults: totalFilteredResults,
                },
                results: paginatedResults,
                appliedFilters: {
                    filteredResults: filteredResults.length,
                    priceRange: filters.priceRange,
                    starRating: filters.starRating,
                    amenities: filters.amenities,
                    mealTypes: filters.mealTypes,
                    neighborhoods: filters.neighborhoods,
                    poi: filters.poi,
                    cancellation: filters.cancellation,
                    hotelNames: filters.hotelNames,
                },
                appliedSort: {
                    by: sort.by,
                    direction: sort.order,
                },
            };
            return completeResponse;
        }
        catch (error) {
            console.log('~ ProvidersSearchService ~ searchFiltration ~ error:', error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('ERR_FILTRATION_PROCESSING_FAILED');
            }
        }
    }
    createEmptyResponse(searchReqId, pagination, filters, sort, status, message) {
        return {
            searchReqId,
            status,
            message,
            timestamp: date_utility_1.DateUtility.toISOString(),
            totalResults: 0,
            location: { lat: 0, lon: 0 },
            radiusKm: 0,
            facets: {
                ratings: {},
                price: { min: 0, max: 0, buckets: {} },
                amenities: {},
                poi: {},
                neighborhoods: {},
                mealTypes: {},
                hotelNames: [],
            },
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalPages: 0,
                totalFilteredResults: 0,
            },
            results: [],
            appliedFilters: {
                filteredResults: 0,
                priceRange: filters.priceRange,
                starRating: filters.starRating,
                amenities: filters.amenities,
                mealTypes: filters.mealTypes,
                neighborhoods: filters.neighborhoods,
                poi: filters.poi,
                cancellation: filters.cancellation,
                hotelNames: filters.hotelNames,
            },
            appliedSort: {
                by: sort.by,
                direction: sort.order,
            },
        };
    }
    createCompleteResponse(results, searchReqId, searchReq) {
        const page = parseInt(searchReq.page) || 1;
        const limit = parseInt(searchReq.limit) || 10;
        const totalResults = results.length;
        if (!results || results.length === 0) {
            return {
                searchReqId,
                status: 'completed',
                message: 'No hotels found',
                timestamp: date_utility_1.DateUtility.toISOString(),
                totalResults: 0,
                location: { lat: 0, lon: 0 },
                radiusKm: 5,
                facets: {
                    ratings: {},
                    price: { min: 0, max: 0, buckets: {} },
                    amenities: {},
                    poi: {},
                    neighborhoods: {},
                    mealTypes: {},
                    hotelNames: [],
                },
                pagination: { page, limit, totalPages: 0, totalFilteredResults: 0 },
                results: [],
                appliedFilters: {
                    filteredResults: 0,
                    priceRange: [0, 0],
                    starRating: [],
                    amenities: [],
                    mealTypes: [],
                    neighborhoods: [],
                    poi: [],
                    cancellation: [],
                    hotelNames: [],
                },
                appliedSort: { by: searchReq?.sort?.by || 'price', direction: searchReq?.sort?.order || 'asc' },
            };
        }
        const facets = this.generateFacets(results);
        const pagination = generic_utility_1.Generic.calculatePagination(totalResults, page, limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedResults = results.slice(startIndex, endIndex);
        const location = results[0]?.location;
        const priceRange = generic_utility_1.Generic.calculatePriceRange(results, 'selling');
        return {
            searchReqId,
            status: 'completed',
            message: 'Search completed successfully',
            timestamp: date_utility_1.DateUtility.toISOString(),
            totalResults,
            location,
            radiusKm: 5,
            facets,
            pagination,
            results: paginatedResults,
            appliedFilters: {
                filteredResults: paginatedResults.length,
                priceRange,
                starRating: [],
                amenities: [],
                mealTypes: [],
                neighborhoods: [],
                poi: [],
                cancellation: [],
                hotelNames: [],
            },
            appliedSort: {
                by: searchReq?.sort?.by || 'price',
                direction: searchReq?.sort?.order || 'asc',
            },
        };
    }
    generateFacets(results) {
        const ratings = {};
        const amenities = {};
        const neighborhoods = {};
        const mealTypes = {};
        const poi = {};
        const hotelNames = [];
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        results.forEach((hotel, index) => {
            if (hotel.rating?.stars) {
                const stars = hotel.rating.stars.toString();
                ratings[stars] = (ratings[stars] || 0) + 1;
            }
            if (hotel.prices?.selling) {
                minPrice = Math.min(minPrice, hotel.prices.selling);
                maxPrice = Math.max(maxPrice, hotel.prices.selling);
            }
            if (hotel.amenities && Array.isArray(hotel.amenities)) {
                const hotelAmenitiesSet = new Set();
                hotel.amenities.forEach((amenity) => {
                    const amenityName = amenity?.name || amenity;
                    if (amenityName && typeof amenityName === 'string') {
                        hotelAmenitiesSet.add(amenityName.trim());
                    }
                });
                hotelAmenitiesSet.forEach((amenityName) => {
                    amenities[amenityName] = (amenities[amenityName] || 0) + 1;
                });
            }
            if (hotel.poi && Array.isArray(hotel.poi)) {
                hotel.poi.forEach((poiItem) => {
                    const poiName = (poiItem || poiItem)?.trim();
                    if (poiName) {
                        poi[poiName] = (poi[poiName] || 0) + 1;
                    }
                });
            }
            if (hotel.neighborhoods && Array.isArray(hotel.neighborhoods)) {
                hotel.neighborhoods.forEach((neighborhood) => {
                    const trimmedNeighborhood = neighborhood?.trim();
                    if (trimmedNeighborhood && trimmedNeighborhood !== 'undefined' && trimmedNeighborhood !== 'null') {
                        neighborhoods[trimmedNeighborhood] = (neighborhoods[trimmedNeighborhood] || 0) + 1;
                    }
                });
            }
            if (hotel.mealType && typeof hotel.mealType === 'string') {
                const trimmedMealType = hotel.mealType.trim();
                if (trimmedMealType && trimmedMealType !== 'undefined' && trimmedMealType !== 'null' && trimmedMealType !== '') {
                    mealTypes[trimmedMealType] = (mealTypes[trimmedMealType] || 0) + 1;
                }
            }
            else {
            }
            if (hotel.name) {
                hotelNames.push(hotel.name);
            }
        });
        const currency = results[0]?.prices?.currency || 'USD';
        const currencySymbol = generic_utility_1.Generic.getCurrencySymbol(currency);
        const priceBuckets = generic_utility_1.Generic.generatePriceBuckets(results, currencySymbol, 'selling');
        return {
            ratings,
            price: {
                min: minPrice === Infinity ? 0 : minPrice,
                max: maxPrice === -Infinity ? 0 : maxPrice,
                currency: currency,
                currencySymbol: currencySymbol,
                buckets: priceBuckets,
            },
            amenities,
            poi,
            neighborhoods,
            mealTypes,
            hotelNames,
        };
    }
    applyFilters(results, filters) {
        if (!Array.isArray(results)) {
            return [];
        }
        if (!filters || typeof filters !== 'object') {
            return results;
        }
        if (filters.hotelNames && filters.hotelNames.length > 0) {
            const names = Array.isArray(filters.hotelNames)
                ? filters.hotelNames
                : [filters.hotelNames];
            results = results.filter((hotel) => {
                const hotelName = hotel?.name?.trim().toLowerCase() || '';
                return names.some((name) => hotelName.includes(name.trim().toLowerCase()));
            });
        }
        return results.filter((hotel) => {
            if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length > 0) {
                const hotelPrice = hotel?.prices?.selling || 0;
                if (filters.priceRange[0] == '0' && filters.priceRange[1] == '0') {
                    return true;
                }
                if (typeof filters.priceRange[0] === 'string') {
                    const priceRanges = filters.priceRange.map((bucket) => generic_utility_1.Generic.bucketToRange(bucket));
                    const isInAnyBucket = priceRanges.some(([min, max]) => hotelPrice >= min && hotelPrice <= max);
                    if (!isInAnyBucket) {
                        return false;
                    }
                }
                else if (filters.priceRange.length === 2) {
                    const [minPrice, maxPrice] = filters.priceRange;
                    if (hotelPrice < minPrice || hotelPrice > maxPrice) {
                        return false;
                    }
                }
            }
            if (filters.starRating && Array.isArray(filters.starRating) && filters.starRating.length > 0) {
                const hotelStars = Number(hotel?.rating?.stars || 0);
                if (!filters.starRating.includes(hotelStars)) {
                    return false;
                }
            }
            if (filters.amenities && Array.isArray(filters.amenities) && filters.amenities.length > 0) {
                const hotelAmenities = hotel?.amenities?.map((a) => a?.name?.trim().toLowerCase?.() || a?.trim().toLowerCase()) || [];
                const hasRequiredAmenities = filters.amenities.every((amenity) => hotelAmenities.some((hotelAmenity) => hotelAmenity?.includes(amenity.trim().toLowerCase())));
                if (!hasRequiredAmenities) {
                    return false;
                }
            }
            if (filters.mealTypes && Array.isArray(filters.mealTypes) && filters.mealTypes.length > 0) {
                const hotelMealType = hotel?.mealType?.trim().toLowerCase() || '';
                if (!hotelMealType) {
                    return false;
                }
                const hasRequiredMealType = filters.mealTypes.some((mealType) => hotelMealType.includes(mealType.trim().toLowerCase()));
                if (!hasRequiredMealType) {
                    return false;
                }
            }
            if (filters.neighborhoods && Array.isArray(filters.neighborhoods) && filters.neighborhoods.length > 0) {
                const hotelNeighborhoods = hotel?.neighborhoods?.map((n) => n?.trim().toLowerCase()) || [];
                const hasRequiredNeighborhood = filters.neighborhoods.some((neighborhood) => hotelNeighborhoods.some((hotelNeighborhood) => hotelNeighborhood?.includes(neighborhood.trim().toLowerCase())));
                if (!hasRequiredNeighborhood) {
                    return false;
                }
            }
            if (filters.poi && Array.isArray(filters.poi) && filters.poi.length > 0) {
                const hotelPOI = hotel?.poi?.map((p) => (p?.poiName || p?.name || p)?.trim().toLowerCase()) || [];
                const hasRequiredPOI = filters.poi.some((poi) => hotelPOI.some((hotelPoi) => hotelPoi?.includes(poi.trim().toLowerCase())));
                if (!hasRequiredPOI) {
                    return false;
                }
            }
            if (filters.cancellation && filters.cancellation.length > 0) {
                const isRefundable = hotel?.cancellationPolicy?.refundable || false;
                const cancellationType = isRefundable ? 'refundable' : 'non-refundable';
                if (!filters.cancellation.includes(cancellationType)) {
                    return false;
                }
            }
            return true;
        });
    }
    applySorting(results, sort) {
        return results.sort((a, b) => {
            let comparison = 0;
            switch (sort.by) {
                case 'price':
                    const priceA = a.prices?.selling || 0;
                    const priceB = b.prices?.selling || 0;
                    comparison = priceA - priceB;
                    break;
                case 'rating':
                    const ratingA = a.rating?.stars || 0;
                    const ratingB = b.rating?.stars || 0;
                    comparison = ratingA - ratingB;
                    break;
                case 'name':
                    const nameA = a.name || '';
                    const nameB = b.name || '';
                    comparison = nameA.localeCompare(nameB);
                    break;
                case 'distance':
                    const distanceA = generic_utility_1.Generic.calculateDistance(sort.userLocation?.lat || 0, sort.userLocation?.lon || 0, a.location?.lat || 0, a.location?.lon || 0);
                    const distanceB = generic_utility_1.Generic.calculateDistance(sort.userLocation?.lat || 0, sort.userLocation?.lon || 0, b.location?.lat || 0, b.location?.lon || 0);
                    comparison = distanceA - distanceB;
                    break;
                default:
                    comparison = 0;
            }
            return sort.order === 'desc' ? -comparison : comparison;
        });
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = SearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [providers_search_service_1.ProvidersSearchService,
        supplier_cred_service_1.SupplierCredService,
        caching_utility_1.CachingUtility])
], SearchService);
//# sourceMappingURL=search.service.js.map