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
var HotelDumpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelDumpService = void 0;
const common_1 = require("@nestjs/common");
const http_utility_1 = require("../../../shared/utilities/flight/http.utility");
const amenity_master_entity_1 = require("./entities/amenity-master.entity");
const amenity_mapping_entity_1 = require("./entities/amenity-mapping.entity");
const board_code_master_entity_1 = require("./entities/board-code-master.entity");
const board_code_mapping_entity_1 = require("./entities/board-code-mapping.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
const country_entity_1 = require("../../../shared/entities/country.entity");
const city_entity_1 = require("../../../shared/entities/city.entity");
const hotel_master_entity_1 = require("../../../shared/entities/hotel-master.entity");
const tbo_hotel_images_entity_1 = require("./entities/tbo-hotel-images.entity");
const tbo_hotel_additional_details_entity_1 = require("./entities/tbo-hotel-additional-details.entity");
const tbo_hotel_content_entity_1 = require("./entities/tbo-hotel-content.entity");
const tbo_hotel_room_content_entity_1 = require("./entities/tbo-hotel-room-content.entity");
const schedule_1 = require("@nestjs/schedule");
let HotelDumpService = HotelDumpService_1 = class HotelDumpService {
    amenityMasterRepository;
    amenityMappingRepository;
    boardCodeMasterRepository;
    boardCodeMappingRepository;
    hotelDetailsRepository;
    hotelImagesRepository;
    hotelContentRepository;
    hotelRoomContentRepository;
    countryRepository;
    cityRepository;
    hotelMasterRepository;
    supplierCredService;
    logger = new common_1.Logger(HotelDumpService_1.name);
    terminalsCache = new Map();
    constructor(amenityMasterRepository, amenityMappingRepository, boardCodeMasterRepository, boardCodeMappingRepository, hotelDetailsRepository, hotelImagesRepository, hotelContentRepository, hotelRoomContentRepository, countryRepository, cityRepository, hotelMasterRepository, supplierCredService) {
        this.amenityMasterRepository = amenityMasterRepository;
        this.amenityMappingRepository = amenityMappingRepository;
        this.boardCodeMasterRepository = boardCodeMasterRepository;
        this.boardCodeMappingRepository = boardCodeMappingRepository;
        this.hotelDetailsRepository = hotelDetailsRepository;
        this.hotelImagesRepository = hotelImagesRepository;
        this.hotelContentRepository = hotelContentRepository;
        this.hotelRoomContentRepository = hotelRoomContentRepository;
        this.countryRepository = countryRepository;
        this.cityRepository = cityRepository;
        this.hotelMasterRepository = hotelMasterRepository;
        this.supplierCredService = supplierCredService;
    }
    async getHotelAutocomplete(hotelAutocompleteDto) {
        try {
            const { query: search, lat, long } = hotelAutocompleteDto;
            if (!search || search.trim().length < 2) {
                throw new common_1.BadRequestException('Search term must be at least 2 characters long');
            }
            const searchTerm = search.trim().toLowerCase();
            const hotels = await this.hotelContentRepository
                .createQueryBuilder('hotel')
                .where('(LOWER(hotel.hotelName) LIKE :search OR LOWER(hotel.city) LIKE :search OR LOWER(hotel.country) LIKE :search)', { search: `%${searchTerm}%` })
                .orderBy('hotel.hotelName', 'ASC')
                .limit(10)
                .getMany();
            const suggestions = hotels.map((hotel) => ({
                hotelCode: hotel.hotelCode,
                hotelName: hotel.hotelName,
                city: hotel.city,
                state: hotel.state,
                country: hotel.country,
                rating: hotel.rating,
                address: hotel.address,
                heroImage: hotel.heroImage,
            }));
            return {
                success: true,
                message: 'Hotel autocomplete suggestions retrieved successfully',
                data: suggestions,
                totalCount: suggestions.length,
            };
        }
        catch (error) {
            this.logger.error('Error in getHotelAutocomplete:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to get hotel autocomplete suggestions');
        }
    }
    async getHotelDetails(hotelCode) {
        try {
            if (!hotelCode) {
                throw new common_1.BadRequestException('Hotel code is required');
            }
            const hotel = await this.hotelMasterRepository.findOne({
                where: { hotelCode },
            });
            const hotelContent = await this.hotelContentRepository.findOne({
                where: { hotelCode },
            });
            if (!hotel || !hotelContent) {
                throw new common_1.BadRequestException('Hotel not found');
            }
            const additionalDetails = await this.hotelDetailsRepository.findOne({
                where: { hotelCode },
            });
            const images = await this.hotelImagesRepository.find({
                where: { hotelCode },
            });
            const hotelPois = additionalDetails?.interestPoints?.length
                ? additionalDetails.interestPoints.map(poi => ({
                    name: poi,
                    distance: '',
                }))
                : [];
            const hotelAmenities = additionalDetails?.amenities?.length
                ? additionalDetails.amenities.map(poi => ({
                    code: this.createAmenitiesCode(poi),
                    title: poi,
                    isPaid: false,
                }))
                : [];
            const hotelImages = images.length > 0
                ? images.map(img => ({
                    thumbnail: '',
                    small: '',
                    bigger: '',
                    standard: img.url || '',
                    xl: '',
                    xxl: '',
                    original: '',
                }))
                : [];
            const boardCodes = [];
            const processedImages = [];
            return {
                hotelId: hotel.hotelCode,
                name: hotel.hotelName,
                address: hotelContent.address,
                phones: [],
                description: hotel?.highlightText || '',
                rating: {
                    stars: hotelContent.rating,
                    reviewScore: ''
                },
                location: {
                    geoLocation: {
                        latitude: hotelContent.latitude,
                        longitude: hotelContent.longitude,
                    },
                    city: hotelContent.city,
                    state: hotelContent.state,
                    country: additionalDetails?.country || '',
                    countryCode: hotelContent.countryCode,
                },
                images: hotelImages || [],
                amenities: hotelAmenities || [],
                poi: hotelPois || [],
                neighbourhoods: [],
            };
        }
        catch (error) {
            this.logger.error('Error in getHotelDetails:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to get hotel details');
        }
    }
    async transferDataToHotelContent(transferData) {
        try {
            const { from, to } = transferData;
            if (!from || !to) {
                throw new common_1.BadRequestException('From and to values are required');
            }
            this.logger.log(`Transferring data from ${from} to ${to}`);
            return {
                success: true,
                message: `Data transfer from ${from} to ${to} completed successfully`,
            };
        }
        catch (error) {
            this.logger.error('Error in transferDataToHotelContent:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to transfer data');
        }
    }
    async getHotelRoomContent(hotelCode) {
        try {
            if (!hotelCode) {
                throw new common_1.BadRequestException('Hotel code is required');
            }
            const roomContent = await this.hotelRoomContentRepository.find({
                where: { hotelCode },
            });
            return {
                success: true,
                message: 'Hotel room content retrieved successfully',
                data: roomContent,
            };
        }
        catch (error) {
            this.logger.error('Error in getHotelRoomContent:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to get hotel room content');
        }
    }
    async bulkInsertHotelContent(hotelData) {
        try {
            if (!hotelData || hotelData.length === 0) {
                throw new common_1.BadRequestException('Hotel data is required');
            }
            const processedData = hotelData.map((hotel) => ({
                hotelCode: hotel.hotelCode,
                hotelName: hotel.hotelName,
                rating: hotel.rating,
                latitude: hotel.latitude,
                longitude: hotel.longitude,
                address: hotel.address,
                city: hotel.city,
                state: hotel.state,
                country: hotel.country,
                cityCode: hotel.cityCode,
                stateCode: hotel.stateCode,
                countryCode: hotel.countryCode,
                pincode: hotel.pincode,
                heroImage: hotel.heroImage,
                hotelNameNormalized: hotel.hotelName?.toLowerCase().replace(/[^a-z0-9]/g, ''),
            }));
            await this.hotelContentRepository.save(processedData);
            return {
                success: true,
                message: `${processedData.length} hotel records inserted successfully`,
            };
        }
        catch (error) {
            this.logger.error('Error in bulkInsertHotelContent:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to insert hotel content');
        }
    }
    async addCountryList(headers) {
        try {
            this.logger.log('Starting country list dump from TBO API');
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');
            if (!tboProvider) {
                throw new common_1.BadRequestException('TBO provider not found');
            }
            console.log(tboProvider.provider_credentials, 'provider_credentials');
            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            console.log(auth);
            const endpoint = `${providerCredentials.dump_url}/CountryList`;
            const response = await http_utility_1.Http.httpRequestTBOHotel('GET', endpoint, null, auth);
            console.log(response);
            if (!response.CountryList || !Array.isArray(response.CountryList)) {
                throw new common_1.BadRequestException('Invalid country list response from TBO API');
            }
            const existingCountries = await this.countryRepository
                .createQueryBuilder('country')
                .where('country.iso2 IN (:...codes)', {
                codes: response.CountryList.map((country) => country.Code),
            })
                .getMany();
            if (existingCountries.length > 0) {
                return {
                    success: true,
                    message: 'Country list already exists in database',
                };
            }
            const countryEntities = response.CountryList.map((country) => {
                const entity = new country_entity_1.CountryEntity();
                entity.iso2 = country.Code;
                entity.countryName = country.Name;
                return entity;
            });
            await this.countryRepository.save(countryEntities);
            this.logger.log(`Successfully added ${countryEntities.length} countries`);
            return {
                success: true,
                message: `Country list added successfully: ${countryEntities.length} countries`,
            };
        }
        catch (error) {
            this.logger.error('Error in addCountryList:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to add country list');
        }
    }
    async addCityList(headers) {
        try {
            this.logger.log('Starting city list dump from TBO API');
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');
            if (!tboProvider) {
                throw new common_1.BadRequestException('TBO provider not found');
            }
            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            const endpoint = `${providerCredentials.dump_url}/CityList`;
            const citiesCount = await this.cityRepository.count();
            if (citiesCount > 0) {
                return {
                    success: true,
                    message: 'City list already exists in database',
                };
            }
            const countries = await this.countryRepository.find();
            let allCities = [];
            for (const country of countries) {
                try {
                    const response = await http_utility_1.Http.httpRequestTBOHotel('POST', endpoint, { CountryCode: country.iso2 }, auth);
                    if (!response.CityList || !Array.isArray(response.CityList)) {
                        this.logger.warn(`No cities found for country ${country.iso2}`);
                        continue;
                    }
                    const cities = response.CityList.map((city) => {
                        const entity = new city_entity_1.CityEntity();
                        entity.cityName = city.Name;
                        entity.cityCodeTbo = city.Code;
                        entity.countryId = country.countryId;
                        entity.countryCode = country.iso2 || '';
                        entity.countryName = country.countryName;
                        entity.stateId = 0;
                        entity.stateCode = '';
                        entity.stateName = '';
                        entity.latitude = 0;
                        entity.longitude = 0;
                        return entity;
                    });
                    allCities = allCities.concat(cities);
                }
                catch (error) {
                    this.logger.error(`Failed to fetch cities for country ${country.iso2}:`, error);
                    continue;
                }
            }
            if (allCities.length === 0) {
                throw new common_1.BadRequestException('No cities found in any API response');
            }
            await this.cityRepository.save(allCities, { chunk: 100 });
            this.logger.log(`Successfully added ${allCities.length} cities`);
            return {
                success: true,
                message: `City list added successfully: ${allCities.length} cities`,
            };
        }
        catch (error) {
            this.logger.error('Error in addCityList:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to add city list');
        }
    }
    async addHotelList(headers) {
        try {
            this.logger.log('Starting hotel list dump from TBO API');
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');
            if (!tboProvider)
                throw new common_1.BadRequestException('TBO provider not found');
            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            const cityCode = '115936';
            const listEndpoint = `${providerCredentials.dump_url}/TBOHotelCodeList`;
            const hotelListResponse = await http_utility_1.Http.httpRequestTBOHotel('POST', listEndpoint, { CityCode: cityCode }, auth);
            if (!hotelListResponse.Hotels || !Array.isArray(hotelListResponse.Hotels)) {
                throw new common_1.BadRequestException('Invalid hotel codes response from TBO API');
            }
            const Hotels = hotelListResponse.Hotels;
            const chunkSize = 1000;
            let existingHotels = [];
            for (let i = 0; i < Hotels.length; i += chunkSize) {
                const chunk = Hotels.slice(i, i + chunkSize).map((h) => h.HotelCode);
                const hotels = await this.hotelMasterRepository.createQueryBuilder('hotel').where('hotel.hotelCode IN (:...codes)', { codes: chunk }).select('hotel.hotelCode').getMany();
                existingHotels = existingHotels.concat(hotels);
            }
            const existingCodes = new Set(existingHotels.map((h) => h.hotelCode));
            const newHotels = Hotels.filter((h) => !existingCodes.has(h.HotelCode));
            if (newHotels.length === 0) {
                return { success: true, message: 'All hotel codes already exist in database' };
            }
            const detailEndpoint = `${providerCredentials.dump_url}/Hoteldetails`;
            const detailedResponses = await Promise.all(newHotels.map((hotel) => http_utility_1.Http.httpRequestTBOHotel('POST', detailEndpoint, { Hotelcodes: hotel.HotelCode }, auth)));
            const hotelEntities = [];
            const hotelContentEntities = [];
            const hotelAdditionalDetailsEntities = [];
            const hotelImagesEntities = [];
            for (const detailResp of detailedResponses) {
                if (detailResp.HotelDetails && detailResp.HotelDetails.length > 0) {
                    const detail = detailResp.HotelDetails[0];
                    const entity = new hotel_master_entity_1.HotelMasterEntity();
                    entity.hotelCode = detail.HotelCode;
                    entity.hotelName = detail.HotelName || '';
                    entity.highlightText = detail.Description || '';
                    entity.address = detail.Address || '';
                    entity.city = detail.CityName || '';
                    entity.countryCode = detail.CountryCode || '';
                    entity.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    entity.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    entity.starRating = detail.HotelRating || null;
                    entity.providerCode = 'TBO';
                    entity.hotelSource = hotel_master_entity_1.HotelSourceEnum.TBO;
                    entity.isActive = true;
                    entity.isDeleted = false;
                    entity.createdAt = new Date();
                    hotelEntities.push(entity);
                    const hotelContent = new tbo_hotel_content_entity_1.TboHotelContentEntity();
                    hotelContent.hotelCode = detail.HotelCode;
                    hotelContent.hotelName = detail.HotelName || '';
                    hotelContent.address = detail.Address || '';
                    hotelContent.city = detail.CityName || '';
                    hotelContent.cityCode = cityCode;
                    hotelContent.countryCode = detail.CountryCode || '';
                    hotelContent.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    hotelContent.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    hotelContent.rating = detail.HotelRating || null;
                    hotelContentEntities.push(hotelContent);
                    const additionalDetail = new tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity();
                    additionalDetail.hotelCode = detail.HotelCode;
                    additionalDetail.supplierCode = 'TBO';
                    additionalDetail.hotelName = detail.HotelName || '';
                    additionalDetail.rating = detail.HotelRating || null;
                    additionalDetail.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    additionalDetail.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    additionalDetail.address = detail.Address || '';
                    additionalDetail.city = detail.CityName || '';
                    additionalDetail.state = '';
                    additionalDetail.country = detail.CountryName || '';
                    additionalDetail.cityCode = cityCode;
                    additionalDetail.stateCode = '';
                    additionalDetail.countryCode = detail.CountryCode || '';
                    additionalDetail.pincode = detail.PinCode || '';
                    additionalDetail.heroImage = detail.Image || '';
                    additionalDetail.amenities = detail.HotelFacilities || [];
                    additionalDetail.description = detail.description;
                    additionalDetail.hotelEmail = detail.Email || '';
                    additionalDetail.hotelPhones = detail.PhoneNumber ? [detail.PhoneNumber] : [];
                    additionalDetail.boardCodes = [];
                    additionalDetail.websiteUrl = detail.HotelWebsiteUrl || '';
                    additionalDetail.interestPoints = detail.Attractions ? Object.values(detail.Attractions) : [];
                    additionalDetail.terminals = [];
                    additionalDetail.createdAt = new Date();
                    additionalDetail.updatedAt = new Date();
                    additionalDetail.hotelVector = '';
                    additionalDetail.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;
                    hotelAdditionalDetailsEntities.push(additionalDetail);
                    if (detail.Images && Array.isArray(detail.Images)) {
                        let order = 1;
                        for (const imgUrl of detail.Images) {
                            const imageEntity = new tbo_hotel_images_entity_1.TboHotelImagesEntity();
                            imageEntity.hotelCode = detail.HotelCode;
                            imageEntity.supplierCode = 'TBO';
                            imageEntity.typeCode = 'EXTERIOR';
                            imageEntity.typeName = '';
                            imageEntity.roomCode = '';
                            imageEntity.roomType = '';
                            imageEntity.url = imgUrl;
                            imageEntity.order = order++;
                            imageEntity.visualOrder = order;
                            imageEntity.createdAt = new Date();
                            imageEntity.updatedAt = new Date();
                            hotelImagesEntities.push(imageEntity);
                        }
                    }
                }
            }
            await this.hotelMasterRepository.save(hotelEntities, { chunk: 100 });
            await this.hotelContentRepository.save(hotelContentEntities, { chunk: 100 });
            await this.hotelDetailsRepository.save(hotelAdditionalDetailsEntities, { chunk: 100 });
            await this.hotelImagesRepository.save(hotelImagesEntities, { chunk: 100 });
            this.logger.log(`Successfully added ${hotelEntities.length} hotels with full details`);
            return {
                success: true,
                message: `Hotel details added successfully: ${hotelEntities.length} hotels`,
            };
        }
        catch (error) {
            this.logger.error('Error in addHotelList:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to add hotel list');
        }
    }
    async addHotelListProduction(headers) {
        let successfullyProcessedHotels = 0;
        try {
            this.logger.log('Starting hotel list dump from TBO API');
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');
            if (!tboProvider)
                throw new common_1.BadRequestException('TBO provider not found');
            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            const cityCode = '115936';
            const listEndpoint = `${providerCredentials.dump_url}/hotelcodelist`;
            const hotelListResponse = await http_utility_1.Http.httpRequestTBOHotel('GET', listEndpoint, '', auth);
            if (!hotelListResponse.HotelCodes || !Array.isArray(hotelListResponse.HotelCodes)) {
                throw new common_1.BadRequestException('Invalid hotel codes response from TBO API');
            }
            const hotelCodes = hotelListResponse.HotelCodes;
            const chunkSize = 1000;
            let existingHotels = [];
            for (let i = 0; i < hotelCodes.length; i += chunkSize) {
                const chunk = hotelCodes.slice(i, i + chunkSize);
                const hotels = await this.hotelMasterRepository.createQueryBuilder('hotel').where('hotel.hotelCode IN (:...codes)', { codes: chunk }).select('hotel.hotelCode').getMany();
                existingHotels = existingHotels.concat(hotels);
            }
            const existingCodes = new Set(existingHotels.map((h) => h.hotelCode));
            const newHotels = hotelCodes.filter((code) => !existingCodes.has(code));
            if (newHotels.length === 0) {
                return { success: true, message: 'All hotel codes already exist in database' };
            }
            const batchSize = 100;
            const detailEndpoint = `${providerCredentials.dump_url}/Hoteldetails`;
            const fetchHotelDetailsInBatches = async () => {
                const hotelDetails = [];
                for (let i = 0; i < newHotels.length; i += batchSize) {
                    const batch = newHotels.slice(i, i + batchSize);
                    try {
                        const batchResponses = await Promise.all(batch.map(code => http_utility_1.Http.httpRequestTBOHotel('POST', detailEndpoint, { Hotelcodes: code }, auth)));
                        hotelDetails.push(...batchResponses);
                        console.log(`Batch processed: ${batch.length} hotels`);
                    }
                    catch (error) {
                        this.logger.error(`Failed to fetch batch for hotel codes ${batch.join(', ')}`, error);
                        continue;
                    }
                }
                return hotelDetails;
            };
            const detailedResponses = await fetchHotelDetailsInBatches();
            console.log(detailedResponses, "hotelDetails");
            const hotelEntities = [];
            const hotelContentEntities = [];
            const hotelAdditionalDetailsEntities = [];
            const hotelImagesEntities = [];
            for (const detailResp of detailedResponses) {
                console.log(detailResp);
                if (detailResp.HotelDetails && detailResp.HotelDetails.length > 0) {
                    const detail = detailResp.HotelDetails[0];
                    console.log(detail, "details");
                    const hotelEntity = new hotel_master_entity_1.HotelMasterEntity();
                    hotelEntity.hotelCode = detail.HotelCode;
                    hotelEntity.hotelName = detail.HotelName || '';
                    hotelEntity.highlightText = detail.Description || '';
                    hotelEntity.address = detail.Address || '';
                    hotelEntity.city = detail.CityName || '';
                    hotelEntity.countryCode = detail.CountryCode || '';
                    hotelEntity.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    hotelEntity.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    hotelEntity.starRating = detail.HotelRating || null;
                    hotelEntity.providerCode = 'TBO';
                    hotelEntity.hotelSource = hotel_master_entity_1.HotelSourceEnum.TBO;
                    hotelEntity.isActive = true;
                    hotelEntity.isDeleted = false;
                    hotelEntity.createdAt = new Date();
                    hotelEntities.push(hotelEntity);
                    const hotelContent = new tbo_hotel_content_entity_1.TboHotelContentEntity();
                    hotelContent.hotelCode = detail.HotelCode;
                    hotelContent.hotelName = detail.HotelName || '';
                    hotelContent.address = detail.Address || '';
                    hotelContent.city = detail.CityName || '';
                    hotelContent.cityCode = cityCode;
                    hotelContent.countryCode = detail.CountryCode || '';
                    hotelContent.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    hotelContent.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    hotelContent.rating = detail.HotelRating || null;
                    hotelContentEntities.push(hotelContent);
                    const additionalDetail = new tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity();
                    additionalDetail.hotelCode = detail.HotelCode;
                    additionalDetail.supplierCode = 'TBO';
                    additionalDetail.hotelName = detail.HotelName || '';
                    additionalDetail.rating = detail.HotelRating || null;
                    additionalDetail.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    additionalDetail.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    additionalDetail.address = detail.Address || '';
                    additionalDetail.city = detail.CityName || '';
                    additionalDetail.state = '';
                    additionalDetail.country = detail.CountryName || '';
                    additionalDetail.cityCode = cityCode;
                    additionalDetail.stateCode = '';
                    additionalDetail.countryCode = detail.CountryCode || '';
                    additionalDetail.pincode = detail.PinCode || '';
                    additionalDetail.heroImage = detail.Image || '';
                    additionalDetail.amenities = detail.HotelFacilities || [];
                    additionalDetail.description = detail.Description;
                    additionalDetail.hotelEmail = detail.Email || '';
                    additionalDetail.hotelPhones = detail.PhoneNumber ? [detail.PhoneNumber] : [];
                    additionalDetail.websiteUrl = detail.HotelWebsiteUrl || '';
                    additionalDetail.interestPoints = detail.Attractions ? Object.values(detail.Attractions) : [];
                    additionalDetail.terminals = [];
                    additionalDetail.createdAt = new Date();
                    additionalDetail.updatedAt = new Date();
                    additionalDetail.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;
                    hotelAdditionalDetailsEntities.push(additionalDetail);
                    if (detail.Images && Array.isArray(detail.Images)) {
                        let order = 1;
                        for (const imgUrl of detail.Images) {
                            const imageEntity = new tbo_hotel_images_entity_1.TboHotelImagesEntity();
                            imageEntity.hotelCode = detail.HotelCode;
                            imageEntity.supplierCode = 'TBO';
                            imageEntity.typeCode = 'EXTERIOR';
                            imageEntity.url = imgUrl;
                            imageEntity.order = order++;
                            imageEntity.visualOrder = order;
                            imageEntity.createdAt = new Date();
                            imageEntity.updatedAt = new Date();
                            hotelImagesEntities.push(imageEntity);
                        }
                    }
                    successfullyProcessedHotels++;
                }
                const entityManager = this.hotelMasterRepository.manager;
                await entityManager.transaction(async (transactionalEntityManager) => {
                    try {
                        await transactionalEntityManager.save(hotel_master_entity_1.HotelMasterEntity, hotelEntities);
                        console.log(`Batch processed successfully: ${hotelEntities.length} hotels`);
                        await transactionalEntityManager.save(tbo_hotel_content_entity_1.TboHotelContentEntity, hotelContentEntities);
                        await transactionalEntityManager.save(tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity, hotelAdditionalDetailsEntities);
                        await transactionalEntityManager.save(tbo_hotel_images_entity_1.TboHotelImagesEntity, hotelImagesEntities);
                        console.log(`Successfully saved related entities for this batch`);
                        hotelEntities.length = 0;
                        hotelContentEntities.length = 0;
                        hotelAdditionalDetailsEntities.length = 0;
                        hotelImagesEntities.length = 0;
                    }
                    catch (error) {
                        this.logger.error('Error during transaction commit:', error);
                        throw new Error('Transaction failed');
                    }
                });
                console.log(`Batch of 100 hotels committed successfully.`);
            }
            return {
                success: true,
                message: `Hotel details added successfully: ${successfullyProcessedHotels} hotels`,
            };
        }
        catch (error) {
            this.logger.error('Error in addHotelList:', error);
            throw new common_1.InternalServerErrorException('Failed to add hotel list');
        }
    }
    async onModuleInit() {
        this.logger.log('🏁 HotelMasterService initialized — running initial sync...');
    }
    async handleDailyHotelSync() {
        this.logger.log('🌙 Daily hotel sync started at 2:00 AM...');
    }
    async safeSyncSequence() {
        try {
            await this.syncAllHotelCodes();
            await this.syncInactiveHotelsFromDB();
            this.logger.log('✅ Hotel auto-sync sequence complete');
        }
        catch (error) {
            this.logger.error(`❌ Sync sequence failed: ${error.message}`);
        }
    }
    async syncAllHotelCodes() {
        this.logger.log('🚀 Starting full hotel code sync...');
        try {
            const headers = {
                providerCode: 'TBO',
                moduleType: 'Hotel',
            };
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find(p => p.code === 'TBO');
            if (!tboProvider)
                throw new common_1.BadRequestException('TBO provider not found');
            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            const listEndpoint = `${providerCredentials.dump_url}/hotelcodelist`;
            const hotelListResponse = await http_utility_1.Http.httpRequestTBOHotel('GET', listEndpoint, '', auth);
            if (!hotelListResponse.HotelCodes || !Array.isArray(hotelListResponse.HotelCodes))
                throw new common_1.BadRequestException('Invalid hotel codes response from TBO API');
            const hotelCodes = hotelListResponse.HotelCodes;
            this.logger.log(`📦 Received ${hotelCodes.length} hotel codes`);
            const existingCodes = new Set((await this.hotelMasterRepository.find({ select: ['hotelCode'] }))
                .map(h => h.hotelCode));
            const newCodes = hotelCodes.filter(code => !existingCodes.has(String(code)));
            this.logger.log(`🧾 ${existingCodes.size} existing codes skipped, ${newCodes.length} new to insert`);
            if (!newCodes.length) {
                this.logger.log('✅ No new codes to insert. Sync complete.');
                return;
            }
            const chunkSize = 5000;
            let totalInserted = 0;
            for (let i = 0; i < newCodes.length; i += chunkSize) {
                const chunk = newCodes.slice(i, i + chunkSize);
                const entities = chunk.map(code => this.hotelMasterRepository.create({
                    hotelCode: String(code),
                    hotelSource: hotel_master_entity_1.HotelSourceEnum.TBO,
                    createdAt: new Date(),
                    isActive: false,
                }));
                await this.hotelMasterRepository
                    .createQueryBuilder()
                    .insert()
                    .into(hotel_master_entity_1.HotelMasterEntity)
                    .values(entities)
                    .onConflict(`("hotel_code") DO NOTHING`)
                    .execute();
                totalInserted += entities.length;
                this.logger.log(`✅ Inserted ${i + chunk.length} / ${hotelCodes.length}`);
            }
            this.logger.log(`🏁 Hotel codes synced. Total inserted: ${totalInserted}`);
        }
        catch (error) {
            this.logger.error(`❌ Failed to sync hotel codes: ${error.message}`, error.stack);
        }
    }
    async syncInactiveHotelsFromDB() {
        this.logger.log('🚀 Starting inactive hotel sync...');
        try {
            const headers = {
                providerCode: 'TBO',
                moduleType: 'Hotel',
            };
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find(p => p.code === 'TBO');
            if (!tboProvider)
                throw new common_1.BadRequestException('TBO provider not found');
            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            const detailEndpoint = `${providerCredentials.dump_url}/Hoteldetails`;
            const inactiveHotels = await this.hotelMasterRepository.find({
                where: { isActive: false },
                select: ['hotelCode'],
                take: 2000,
            });
            if (!inactiveHotels.length) {
                this.logger.log('✅ No inactive hotels found.');
                return;
            }
            this.logger.log(`📦 Found ${inactiveHotels.length} inactive hotels to process`);
            for (const h of inactiveHotels) {
                try {
                    await this.updateSingleHotelFromTBO(h.hotelCode, detailEndpoint, auth);
                }
                catch (e) {
                    this.logger.error(`❌ Failed hotel ${h.hotelCode}: ${e.message}`);
                }
            }
            this.logger.log('🏁 Inactive hotel sync complete');
        }
        catch (error) {
            this.logger.error(`❌ Inactive hotel sync failed: ${error.message}`);
        }
    }
    async updateSingleHotelFromTBO(hotelCode, endpoint, auth) {
        const detailResp = await http_utility_1.Http.httpRequestTBOHotel('POST', endpoint, { Hotelcodes: hotelCode }, auth);
        if (!detailResp?.HotelDetails?.length) {
            this.logger.warn(`⚠️ No details found for hotel ${hotelCode}`);
            return;
        }
        const detail = detailResp.HotelDetails[0];
        await this.hotelMasterRepository.update({ hotelCode }, {
            hotelName: detail.HotelName || '',
            highlightText: detail.Description || '',
            address: detail.Address || '',
            city: detail.CityName || '',
            postalCode: detail.PinCode || '',
            countryCode: detail.CountryCode.toUpperCase() || '',
            heroImage: detail.Image,
            latitude: detail.Map ? detail.Map.split('|')[0] : null,
            longitude: detail.Map ? detail.Map.split('|')[1] : null,
            starRating: detail.HotelRating || null,
            providerCode: 'TBO',
            isActive: true,
            updatedAt: new Date(),
        });
        const hotelContent = new tbo_hotel_content_entity_1.TboHotelContentEntity();
        hotelContent.hotelCode = detail.HotelCode;
        hotelContent.hotelName = detail.HotelName || '';
        hotelContent.address = detail.Address || '';
        hotelContent.city = detail.CityName || '';
        hotelContent.cityCode = detail.CityId || '';
        hotelContent.countryCode = detail.CountryCode.toUpperCase() || '';
        hotelContent.country = detail.CountryName || '';
        hotelContent.pincode = detail.PinCode || '';
        hotelContent.latitude = detail.Map ? detail.Map.split('|')[0] : null;
        hotelContent.longitude = detail.Map ? detail.Map.split('|')[1] : null;
        hotelContent.rating = detail.HotelRating || null;
        hotelContent.heroImage = detail.Image || null;
        hotelContent.rating = detail.HotelRating || null;
        hotelContent.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;
        await this.hotelMasterRepository.manager.save(hotelContent);
        const additional = new tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity();
        additional.hotelName = detail.HotelName || '';
        additional.hotelCode = detail.HotelCode;
        additional.supplierCode = 'TBO';
        additional.address = detail.Address || '';
        additional.city = detail.CityName || '';
        additional.country = detail.CountryName || '';
        additional.countryCode = detail.CountryCode || '';
        additional.rating = detail.HotelRating || null;
        additional.latitude = detail.Map ? detail.Map.split('|')[0] : null;
        additional.longitude = detail.Map ? detail.Map.split('|')[1] : null;
        additional.address = detail.Address || '';
        additional.city = detail.CityName || '';
        additional.cityCode = detail.CityId || '';
        additional.state = '';
        additional.stateCode = '';
        additional.countryCode = detail.CountryCode || '';
        additional.pincode = detail.PinCode || '';
        additional.heroImage = detail.Image || '';
        additional.amenities = detail.HotelFacilities || [];
        additional.description = detail.Description;
        additional.hotelEmail = detail.Email || '';
        additional.hotelPhones = detail.PhoneNumber ? [detail.PhoneNumber] : [];
        additional.boardCodes = [];
        additional.hotelEmail = detail.Email || '';
        additional.websiteUrl = detail.HotelWebsiteUrl || '';
        additional.interestPoints = detail.Attractions ? Object.values(detail.Attractions) : [];
        additional.terminals = [];
        additional.createdAt = new Date();
        additional.updatedAt = new Date();
        additional.hotelVector = '';
        additional.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;
        await this.hotelMasterRepository.manager.save(additional);
        await this.hotelMasterRepository.manager.delete(tbo_hotel_images_entity_1.TboHotelImagesEntity, { hotelCode });
        if (Array.isArray(detail.Images)) {
            const images = detail.Images.map((url, i) => ({
                hotelCode,
                supplierCode: 'TBO',
                typeCode: 'EXTERIOR',
                url,
                order: i + 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            await this.hotelMasterRepository.manager.save(tbo_hotel_images_entity_1.TboHotelImagesEntity, images);
        }
        this.logger.log(`✅ Hotel ${hotelCode} fully updated`);
    }
    createAmenitiesCode(name) {
        return name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
    }
};
exports.HotelDumpService = HotelDumpService;
__decorate([
    (0, schedule_1.Cron)('0 2 * * *', { timeZone: 'Asia/Kolkata' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HotelDumpService.prototype, "handleDailyHotelSync", null);
exports.HotelDumpService = HotelDumpService = HotelDumpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(amenity_master_entity_1.AmenityMasterEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(amenity_mapping_entity_1.AmenityMappingEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(board_code_master_entity_1.BoardCodeMasterEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(board_code_mapping_entity_1.BoardCodeMappingEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(tbo_hotel_images_entity_1.TboHotelImagesEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(tbo_hotel_content_entity_1.TboHotelContentEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(tbo_hotel_room_content_entity_1.TboHotelRoomContentEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(country_entity_1.CountryEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(city_entity_1.CityEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(hotel_master_entity_1.HotelMasterEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        supplier_cred_service_1.SupplierCredService])
], HotelDumpService);
//# sourceMappingURL=hotel-dump.service.js.map