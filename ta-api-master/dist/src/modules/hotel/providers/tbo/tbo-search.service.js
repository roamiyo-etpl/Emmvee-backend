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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TboSearchService = void 0;
const common_1 = require("@nestjs/common");
const tbo_repository_1 = require("./tbo.repository");
const typeorm_1 = require("typeorm");
const http_utility_1 = require("../../../../shared/utilities/flight/http.utility");
const uuid_1 = require("uuid");
const tbo_hotel_additional_details_entity_1 = require("../../../dump/hotel/entities/tbo-hotel-additional-details.entity");
const typeorm_2 = require("@nestjs/typeorm");
const tbo_hotel_images_entity_1 = require("../../../dump/hotel/entities/tbo-hotel-images.entity");
const generic_utility_1 = require("../../../../shared/utilities/flight/generic.utility");
let TboSearchService = class TboSearchService {
    hotelDetailsRepository;
    hotelImagesRepository;
    tboRepository;
    constructor(hotelDetailsRepository, hotelImagesRepository, tboRepository) {
        this.hotelDetailsRepository = hotelDetailsRepository;
        this.hotelImagesRepository = hotelImagesRepository;
        this.tboRepository = tboRepository;
    }
    async search(searchRequest, providerCredentials) {
        const searchReqId = (0, uuid_1.v4)();
        try {
            const { searchCriteria, currency, searchMetadata, activeProviders } = searchRequest;
            console.log(currency, "currency check");
            const { checkIn, checkOut, rooms, location } = searchCriteria;
            const { guestNationality } = searchMetadata;
            let hotelData = await this.getHotelDataByLocation(location);
            if (!hotelData || hotelData.length === 0) {
                return [];
            }
            const hotelCodes = hotelData.map((hotel) => hotel.hotelCode).filter((code) => code);
            if (hotelCodes.length === 0) {
                return [];
            }
            const chunkSize = 95;
            const hotelChunks = [];
            for (let i = 0; i < hotelCodes.length; i += chunkSize) {
                hotelChunks.push(hotelCodes.slice(i, i + chunkSize));
            }
            const auth = {
                username: providerCredentials.username,
                password: providerCredentials.password,
            };
            const endpoint = `${providerCredentials.hotel_url}/Search`;
            const searchPromises = hotelChunks.map((chunk, index) => {
                const chunkRequest = this.createTboSearchRequest({
                    checkIn,
                    checkOut,
                    guestNationality,
                    paxRooms: rooms,
                    hotelCodes: chunk,
                });
                return this.executeSearchWithRetry(chunkRequest, endpoint, auth, index);
            });
            const responses = await Promise.allSettled(searchPromises);
            const successfulResponses = responses
                .filter((r) => r.status === 'fulfilled')
                .map((r) => r.value)
                .filter(Boolean);
            if (successfulResponses.length === 0) {
                return [];
            }
            const convertedResults = await Promise.all(successfulResponses.map((response) => this.convertTboResponseToHotelResult(response, hotelData, searchReqId, searchCriteria, currency)));
            const allResults = convertedResults.flat();
            return allResults.sort((a, b) => a.prices.selling - b.prices.selling);
        }
        catch (error) {
            console.error('TBO Search Service Error:', error);
            throw new common_1.InternalServerErrorException('ERR_TBO_SEARCH_FAILED');
        }
    }
    async getHotelDataByLocation(location) {
        const { geoLocation, hotelId, searchKeyword } = location;
        if (hotelId) {
            const hotel = await this.tboRepository.findHotelByCode(hotelId.toString());
            return hotel ? [hotel] : [];
        }
        if (geoLocation?.latitude && geoLocation?.longitude) {
            return await this.tboRepository.findHotelsByCoordinates({
                lat: geoLocation.latitude,
                lng: geoLocation.longitude,
            }, location.radius || 50);
        }
        return await this.tboRepository.findHotelsByCity(searchKeyword);
    }
    createTboSearchRequest(params) {
        const { checkIn, checkOut, guestNationality, paxRooms, hotelCodes } = params;
        return {
            CheckIn: checkIn,
            CheckOut: checkOut,
            Filters: {
                Refundable: false,
                NoOfRooms: 0,
                MealType: 0,
                OrderBy: 0,
                StarRating: 0,
                HotelName: null,
            },
            GuestNationality: guestNationality,
            HotelCodes: hotelCodes.join(','),
            IsDetailedResponse: true,
            PaxRooms: paxRooms.map((room) => ({
                Adults: room.adults,
                Children: room.children,
                ChildrenAges: room.childAges || null,
            })),
            ResponseTime: 23.0,
        };
    }
    async executeSearchWithRetry(request, endpoint, auth, chunkIndex, maxRetries = 2) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await this.makeAuthenticatedRequest('POST', request, endpoint, auth);
                console.log(`TBO Chunk ${chunkIndex} (attempt ${attempt}): ${response?.HotelResult?.length || 0} hotels`);
                return response;
            }
            catch (error) {
                console.error(`TBO Chunk ${chunkIndex} attempt ${attempt} failed:`, error.message);
                if (attempt === maxRetries) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    async makeAuthenticatedRequest(method, data, endpoint, auth) {
        try {
            const response = await http_utility_1.Http.httpRequestTBOHotel(method, endpoint, data, auth);
            return response;
        }
        catch (error) {
            this.handleRequestError(error, endpoint);
            throw error;
        }
    }
    handleRequestError(error, endpoint) {
        if (error.response) {
            console.error(`TBO API Error Response from ${endpoint}:`);
            console.error('Status:', error.response.status);
            console.error('Status Text:', error.response.statusText);
            console.error('Response Data:', error.response.data);
        }
        else if (error.request) {
            console.error(`TBO API No Response from ${endpoint}:`);
            console.error('Request Data:', error.request);
        }
        else {
            console.error(`TBO API Setup Error for ${endpoint}:`);
            console.error('Error Message:', error.message);
        }
    }
    async convertTboResponseToHotelResult(response, hotelData, searchReqId, searchCriteria, currency) {
        if (!response?.HotelResult?.length) {
            return [];
        }
        const hotelDataMap = new Map(hotelData.map((h) => [h.hotelCode, h]));
        const hotelResultPromises = response.HotelResult.map(async (hotel) => {
            const baseHotel = hotelDataMap.get(hotel.HotelCode) || {
                hotelCode: hotel.HotelCode,
                hotelName: `Hotel ${hotel.HotelCode}`,
                address: hotel.address,
                city: '',
                state: '',
                country: '',
                countryCode: '',
                latitude: 0,
                longitude: 0,
                hotelRating: 0,
            };
            const rooms = Array.isArray(hotel.Rooms) ? hotel.Rooms : [];
            if (rooms.length === 0) {
                return this.createHotelResultFromTboData(hotel, baseHotel, null, searchReqId, searchCriteria, currency);
            }
            const cheapestRoom = rooms.reduce((min, room) => (room.TotalFare < min.TotalFare ? room : min));
            return this.createHotelResultFromTboData(hotel, baseHotel, cheapestRoom, searchReqId, searchCriteria, currency);
        });
        return await Promise.all(hotelResultPromises);
    }
    async createHotelResultFromTboData(tboHotel, baseHotel, room, searchReqId, searchCriteria, currency) {
        const totalFare = room ? Number(room.TotalFare) || 0 : 0;
        const totalTax = room ? Number(room.TotalTax) || 0 : 0;
        const providerCurrency = tboHotel.Currency || 'USD';
        const preferredCurrency = currency;
        const hotelCode = baseHotel.hotelCode;
        const [hotelDetailsMap, imagesMap] = await Promise.all([
            this.fetchHotelAdditionalDetails(hotelCode),
            this.fetchHotelImages(hotelCode),
        ]);
        const additionalDetails = hotelDetailsMap.size > 0 ? Array.from(hotelDetailsMap.values())[0] : null;
        let images = imagesMap.size > 0 ? Array.from(imagesMap.values())[0] : [];
        const hotelImages = images.map(img => img.url);
        return {
            hotelId: baseHotel.hotelCode,
            hotelRefId: `${baseHotel.hotelCode}_${searchReqId}`,
            name: baseHotel.hotelName,
            address: baseHotel.address || '',
            city: baseHotel.city || '',
            state: baseHotel.state || '',
            country: baseHotel.country || '',
            countryCode: baseHotel.countryCode || '',
            location: {
                lat: Number(baseHotel.latitude) || 0,
                lon: Number(baseHotel.longitude) || 0,
            },
            rating: {
                stars: baseHotel.starRating || 0,
                reviewScore: null,
            },
            nights: this.calculateNights(searchCriteria.checkIn, searchCriteria.checkOut),
            prices: {
                selling: generic_utility_1.Generic.currencyConversion(totalFare, providerCurrency, preferredCurrency) || 0,
                currency: preferredCurrency,
                taxIncluded: true,
                taxes: generic_utility_1.Generic.currencyConversion(totalTax, providerCurrency, preferredCurrency) || 0,
                priceHash: `TBO_${baseHotel.hotelCode}_${totalFare}_${totalTax}_${searchReqId}`,
            },
            cancellationPolicy: {
                refundable: room?.IsRefundable,
                currency: currency,
                penalties: room.CancelPolicies || [],
            },
            images: hotelImages,
            amenities: additionalDetails?.amenities || [],
            poi: additionalDetails?.interestPoints || [],
            neighborhoods: [],
            mealType: room?.MealType || '',
            providerID: 'TBO',
            providerCode: 'TBO',
        };
    }
    calculateNights(checkIn, checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = checkOutDate.getTime() - checkInDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    async fetchHotelAdditionalDetails(hotelCode) {
        try {
            const hotel = await this.hotelDetailsRepository.createQueryBuilder('hotel').where('hotel.hotelCode = :hotelCode', { hotelCode }).getOne();
            const hotelDetailsMap = new Map();
            if (hotel) {
                hotelDetailsMap.set(hotel.hotelCode, hotel);
            }
            return hotelDetailsMap;
        }
        catch (error) {
            console.error('Error fetching hotel additional details:', error);
            return new Map();
        }
    }
    async fetchHotelImages(hotelCode) {
        try {
            const hotelImages = await this.hotelImagesRepository
                .createQueryBuilder('image')
                .where('image.hotelCode = :hotelCode', { hotelCode })
                .orderBy('image.visualOrder', 'ASC')
                .addOrderBy('image.order', 'ASC')
                .getMany();
            const imagesMap = new Map();
            imagesMap.set(hotelCode, hotelImages);
            return imagesMap;
        }
        catch (error) {
            console.error('Error fetching hotel images:', error);
            return new Map();
        }
    }
};
exports.TboSearchService = TboSearchService;
exports.TboSearchService = TboSearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(tbo_hotel_images_entity_1.TboHotelImagesEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        tbo_repository_1.TboRepository])
], TboSearchService);
//# sourceMappingURL=tbo-search.service.js.map