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
exports.TboRoomService = void 0;
const common_1 = require("@nestjs/common");
const tbo_repository_1 = require("./tbo.repository");
const http_utility_1 = require("../../../../shared/utilities/flight/http.utility");
const uuid_1 = require("uuid");
const tbo_hotel_images_entity_1 = require("../../../dump/hotel/entities/tbo-hotel-images.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tbo_hotel_additional_details_entity_1 = require("../../../dump/hotel/entities/tbo-hotel-additional-details.entity");
const generic_utility_1 = require("../../../../shared/utilities/flight/generic.utility");
let TboRoomService = class TboRoomService {
    hotelImagesRepository;
    hotelDetailsRepository;
    tboRepository;
    constructor(hotelImagesRepository, hotelDetailsRepository, tboRepository) {
        this.hotelImagesRepository = hotelImagesRepository;
        this.hotelDetailsRepository = hotelDetailsRepository;
        this.tboRepository = tboRepository;
    }
    async searchRooms(roomRequest, providerCredentials) {
        const searchReqId = roomRequest.searchReqId || (0, uuid_1.v4)();
        try {
            const { hotelId, currency, supplierCode, checkIn, checkOut, rooms, searchMetadata } = roomRequest;
            if (!hotelId) {
                throw new common_1.BadRequestException('Hotel ID is required');
            }
            const hotelData = await this.tboRepository.findHotelDetailsByHotelCode(hotelId);
            if (!hotelData) {
                throw new common_1.BadRequestException('Hotel not found');
            }
            const auth = {
                username: providerCredentials.username,
                password: providerCredentials.password,
            };
            const endpoint = `${providerCredentials.hotel_url}/Search`;
            const tboRequest = this.createTboRoomSearchRequest({
                hotelId,
                checkIn,
                checkOut,
                rooms,
                searchMetadata,
            });
            const response = await this.executeRoomSearchWithRetry(tboRequest, endpoint, auth);
            const roomResponse = this.convertTboRoomResponseToStandard(response, hotelData, searchReqId, rooms, currency);
            return roomResponse;
        }
        catch (error) {
            console.error('TBO Room Search Service Error:', error);
            throw new common_1.InternalServerErrorException('ERR_TBO_ROOM_SEARCH_FAILED');
        }
    }
    async searchRoomQuote(quoteRequest, providerCredentials) {
        try {
            const { roomBookingInfo, currency, searchReqId, supplierCode } = quoteRequest;
            const rateKey = roomBookingInfo[0].rateKey;
            if (!rateKey) {
                throw new common_1.BadRequestException('Rate key is required');
            }
            const auth = {
                username: providerCredentials.username,
                password: providerCredentials.password,
            };
            const endpoint = `${providerCredentials.hotel_url}/PreBook`;
            const tboRequest = {
                BookingCode: rateKey,
            };
            const response = await this.executeQuoteWithRetry(tboRequest, endpoint, auth);
            const quoteResponse = this.convertTboQuoteResponseToStandard(response, rateKey, currency, searchReqId, supplierCode);
            return quoteResponse;
        }
        catch (error) {
            console.error('TBO Room Quote Service Error:', error);
            throw new common_1.InternalServerErrorException('ERR_TBO_ROOM_QUOTE_FAILED');
        }
    }
    createTboRoomSearchRequest(params) {
        const { hotelId, checkIn, checkOut, rooms, searchMetadata } = params;
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
            GuestNationality: searchMetadata.guestNationality || 'IN',
            HotelCodes: hotelId,
            IsDetailedResponse: true,
            PaxRooms: rooms.map((room) => ({
                Adults: room.adults,
                Children: room.children,
                ChildrenAges: room.childAges || null,
            })),
            ResponseTime: 23.0,
        };
    }
    async executeRoomSearchWithRetry(request, endpoint, auth, maxRetries = 2) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await http_utility_1.Http.httpRequestTBOHotel('POST', endpoint, request, auth);
                console.log(`TBO Room Search (attempt ${attempt}): ${response?.HotelResult?.length || 0} hotels`);
                return response;
            }
            catch (error) {
                console.error(`TBO Room Search attempt ${attempt} failed:`, error.message);
                if (attempt === maxRetries) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    async executeQuoteWithRetry(request, endpoint, auth, maxRetries = 2) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await http_utility_1.Http.httpRequestTBOHotel('POST', endpoint, request, auth);
                console.log(`TBO Room Quote (attempt ${attempt}): Success`);
                return response;
            }
            catch (error) {
                console.error(`TBO Room Quote attempt ${attempt} failed:`, error.message);
                if (attempt === maxRetries) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    async convertTboRoomResponseToStandard(response, hotelData, searchReqId, searchReqRoom, currency) {
        if (!response?.HotelResult?.length) {
            return {
                searchReqId,
                message: 'No rooms available',
                roomData: {
                    hotelName: hotelData.hotelName || 'Unknown Hotel',
                    latitude: hotelData.latitude?.toString() || '0',
                    longitude: hotelData.longitude?.toString() || '0',
                    address: hotelData.address || '',
                    city: hotelData.city || '',
                    country: hotelData.country || '',
                    countryCode: hotelData.countryCode || '',
                    roomCount: 0,
                    roomList: [],
                },
                success: false,
            };
        }
        const totalRooms = searchReqRoom.length;
        const totalAdults = searchReqRoom.reduce((sum, room) => sum + room.adults, 0);
        const totalChildren = searchReqRoom.reduce((sum, room) => sum + room.children, 0);
        const allChildAges = searchReqRoom.flatMap(room => room.childAges);
        const hotelCode = hotelData.hotelCode;
        const [hotelDetailsMap, imagesMap] = await Promise.all([
            this.fetchHotelAdditionalDetails(hotelCode),
            this.fetchHotelImages(hotelCode),
        ]);
        const additionalDetails = hotelDetailsMap.size > 0 ? Array.from(hotelDetailsMap.values())[0] : null;
        let images = imagesMap.size > 0 ? Array.from(imagesMap.values())[0] : [];
        const hotelImages = images.map((img) => img.url);
        const hotelResult = response.HotelResult[0];
        const rooms = Array.isArray(hotelResult.Rooms) ? hotelResult.Rooms : [];
        const providerCurrency = hotelResult.Currency || 'USD';
        const preferredCurrency = currency;
        const roomList = rooms.map((room, index) => {
            const roomName = Array.isArray(room.Name) ? room.Name.join(', ') : room.Name || `Room ${index + 1}`;
            return {
                options: [
                    {
                        roomName,
                        price: {
                            selling: generic_utility_1.Generic.currencyConversion(Number(room.TotalFare), providerCurrency, preferredCurrency) || 0,
                            currency: preferredCurrency,
                            taxIncluded: true,
                            taxes: generic_utility_1.Generic.currencyConversion(Number(room.TotalTax), providerCurrency, preferredCurrency) || 0,
                            priceHash: `TBO_${hotelData.hotelCode}_${Number(room.TotalFare)}_${(room.TotalTax)}_${searchReqId}`,
                        },
                        hotelId: hotelData.hotelCode,
                        roomBookingInfo: [
                            {
                                rateKey: room.BookingCode || '',
                                rooms: totalRooms,
                                adults: totalAdults,
                                children: totalChildren || 0,
                                childAges: allChildAges || [],
                            },
                        ],
                        rooms: totalRooms,
                        adults: totalAdults,
                        children: totalChildren || 0,
                        childAges: allChildAges || [],
                        rateType: 'STANDARD',
                        roomCode: room.BookingCode || '',
                        supplierId: 'TBO',
                        supplierCode: 'TBO',
                        boardCode: room.MealType || '',
                        cancellationPolicy: {
                            refundable: room.IsRefundable || false,
                            currency: hotelResult.Currency || 'USD',
                            penalties: room.CancelPolicies || [],
                        },
                        paymentType: 'PREPAID',
                        boardInfo: room.Inclusion || '',
                        roomDetails: {
                            roomCategory: roomName,
                            roomView: '',
                            beds: {
                                suggestedBedType: '',
                                suggestedBedTypeWithoutNumber: '',
                                bedsArr: [],
                            },
                            bathroomType: '',
                            roomArea: {},
                            roomDescription: room.Inclusion || '',
                            propertyType: '',
                            roomFacilities: additionalDetails?.amenities || [],
                            roomImages: hotelImages || [],
                        },
                    },
                ],
                roomName,
                prices: {
                    selling: generic_utility_1.Generic.currencyConversion(Number(room.TotalFare), providerCurrency, preferredCurrency) || 0,
                    currency: preferredCurrency,
                    taxIncluded: true,
                    taxes: generic_utility_1.Generic.currencyConversion(Number(room.TotalTax), providerCurrency, preferredCurrency) || 0,
                    priceHash: `TBO_${hotelData.hotelCode}_${generic_utility_1.Generic.currencyConversion(Number(room.TotalFare), providerCurrency, preferredCurrency)}_${searchReqId}`,
                },
                hotelId: hotelData.hotelCode,
                rateType: 'STANDARD',
                roomBookingInfo: [
                    {
                        rateKey: room.BookingCode || '',
                        rooms: totalRooms,
                        adults: totalAdults,
                        children: totalChildren || 0,
                        childAges: allChildAges || [],
                    },
                ],
                rooms: totalRooms,
                adults: totalAdults,
                children: totalChildren || 0,
                childAges: allChildAges || [],
                roomCode: room.BookingCode || '',
                supplierId: 'TBO',
                supplierCode: 'TBO',
                supplierRoomName: roomName,
                boardCode: room.MealType || '',
                cancellationPolicy: {
                    refundable: room.IsRefundable || false,
                    currency: hotelResult.Currency || 'USD',
                    penalties: room.CancelPolicies,
                },
                paymentType: 'PREPAID',
                boardInfo: room.Inclusion || '',
            };
        });
        return {
            searchReqId,
            message: 'Rooms fetched successfully',
            roomData: {
                hotelName: hotelData.hotelName || 'Unknown Hotel',
                latitude: hotelData.latitude?.toString() || '0',
                longitude: hotelData.longitude?.toString() || '0',
                address: hotelData.address || '',
                city: hotelData.city || '',
                country: hotelData.country || '',
                countryCode: hotelData.countryCode || '',
                roomCount: roomList.length,
                roomList,
            },
            success: true,
        };
    }
    convertTboQuoteResponseToStandard(response, rateKey, currency, searchReqId, supplierCode) {
        const preferredCurrency = currency;
        const isSuccessful = response?.Status?.Code === 200;
        const hotel = response?.HotelResult?.[0] || {};
        const rooms = hotel?.Rooms?.[0] || {};
        const providerCurrency = hotel?.Currency || 'USD';
        console.log(response);
        const baseResponse = {
            rateKey: rateKey,
            searchReqId: searchReqId,
            status: isSuccessful ? 'AVAILABLE' : response?.Status?.Description || 'NOT AVAILABLE',
            ...(isSuccessful ? {
                prices: {
                    selling: generic_utility_1.Generic.currencyConversion(Number(rooms.NetAmount), providerCurrency, preferredCurrency) || 0,
                    currency: preferredCurrency,
                    taxIncluded: true,
                    taxes: generic_utility_1.Generic.currencyConversion(Number(rooms.TotalTax), providerCurrency, preferredCurrency) || 0,
                    priceHash: `${supplierCode}_${hotel.HotelCode}_${Number(rooms.NetAmount)}_${(rooms.NetTax)}_${searchReqId}`,
                },
                cancellationPolicy: {
                    refundable: !!rooms?.IsRefundable || false,
                    currency: preferredCurrency || '',
                    penalties: rooms?.CancelPolicies || [],
                },
                validationInfo: {
                    isPanMandatory: response.ValidationInfo.PanMandatory,
                    isPassportMandatory: response.ValidationInfo.PassportMandatory,
                    isPanCountRequired: response.ValidationInfo.PanCountRequired,
                    isSamePaxNameAllowed: response.ValidationInfo.SamePaxNameAllowed,
                    isSpaceAllowed: response.ValidationInfo.SpaceAllowed,
                    isSpecialCharAllowed: response.ValidationInfo.SpecialCharAllowed,
                    isPaxNameMinLength: response.ValidationInfo.PaxNameMinLength,
                    isPaxNameMaxLength: response.ValidationInfo.PaxNameMaxLength,
                },
            } : {}),
            remarks: hotel?.RateConditions || '',
        };
        return baseResponse;
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
};
exports.TboRoomService = TboRoomService;
exports.TboRoomService = TboRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tbo_hotel_images_entity_1.TboHotelImagesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        tbo_repository_1.TboRepository])
], TboRoomService);
//# sourceMappingURL=tbo-room.service.js.map