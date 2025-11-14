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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const common_1 = require("@nestjs/common");
const tbo_hotel_additional_details_entity_1 = require("../../dump/hotel/entities/tbo-hotel-additional-details.entity");
const booking_additional_details_entity_1 = require("../../../shared/entities/booking-additional-details.entity");
const booking_logs_entity_1 = require("../../../shared/entities/booking-logs.entity");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
const typeorm_1 = require("typeorm");
let BookRepository = class BookRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(bookings_entity_1.Booking, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async checkDuplicateBooking(reqParams) {
        const { booking, transformedPaxes, userId, mwrLogId, hotel } = reqParams;
        const existingBooking = await this.createQueryBuilder('booking')
            .where('booking.user_id = :userId', { userId: '2bdca29c-c8d7-4150-99f0-98ff7581d393' })
            .andWhere('DATE(booking.checkin) = DATE(:checkin)', { checkin: new Date(booking.checkIn) })
            .andWhere('DATE(booking.checkout) = DATE(:checkout)', { checkout: new Date(booking.checkOut) })
            .andWhere('booking.booking_status IN (:...statuses)', {
            statuses: [bookings_entity_1.BookingStatus.PENDING, bookings_entity_1.BookingStatus.INPROGRESS],
        })
            .andWhere('booking.paxes @> :paxesData', { paxesData: JSON.stringify(transformedPaxes) })
            .orderBy('booking.created_at', 'DESC')
            .getOne();
        return existingBooking;
    }
    async insertBooking(reqParams) {
        const { booking, transformedPaxes, userId, mwrLogId, hotel, searchReqId } = reqParams;
        const numberOfNights = this.calculateNights(booking.checkIn, booking.checkOut);
        const prices = this.parsePriceHash(hotel.prices.priceHash);
        const bookingEntity = new bookings_entity_1.Booking();
        bookingEntity.supplier_name = booking.supplierCode;
        bookingEntity.booking_date = new Date();
        bookingEntity.booking_status = bookings_entity_1.BookingStatus.INPROGRESS;
        bookingEntity.search_id = searchReqId;
        bookingEntity.contact_details = {
            title: booking.contactDetails.title,
            firstName: booking.contactDetails.firstName,
            middleName: booking.contactDetails.middleName || '',
            lastName: booking.contactDetails.lastName,
            gender: booking.contactDetails.gender,
            email: booking.contactDetails.email,
            dialCode: booking.contactDetails.dialCode || '',
            mobileNo: booking.contactDetails.mobileNo || '',
            addressLine1: booking.contactDetails.addressLine1 || '',
            addressLine2: booking.contactDetails.addressLine2 || '',
            city: booking.contactDetails.city || '',
            state: booking.contactDetails.state || '',
            country: booking.contactDetails.country || '',
            postalCode: booking.contactDetails.postalCode || '',
        };
        bookingEntity.reference_id = prices.hotelCode;
        bookingEntity.net_price = prices.price;
        bookingEntity.tax = prices.tax;
        bookingEntity.currency_code = hotel.cancellationPolicy.currency;
        bookingEntity.is_refundable = hotel.cancellationPolicy.refundable;
        bookingEntity.checkin = booking.checkIn;
        bookingEntity.checkout = booking.checkOut;
        bookingEntity.number_of_nights = numberOfNights;
        bookingEntity.paxes = transformedPaxes;
        bookingEntity.user_id = userId;
        bookingEntity.legacy_booking_id = 0;
        bookingEntity.module_type = 2;
        bookingEntity.mwr_log_id = mwrLogId;
        bookingEntity.booking_reference_id = `TA-${generic_utility_1.Generic.generateRandomString()}`;
        return this.save(bookingEntity);
    }
    async getBookingByBookingId(reqParams) {
        const { bookingRefId } = reqParams;
        const booking = await this.findOne({ where: { booking_reference_id: bookingRefId } });
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }
    async storeBookingLog(reqParams) {
        const { bookingRefId, userId, mwrLogId } = reqParams;
        const bookingLog = new booking_logs_entity_1.BookingLog();
        bookingLog.log_id = mwrLogId;
        bookingLog.booking_reference_id = bookingRefId;
        bookingLog.user_id = userId;
        bookingLog.data = {};
        bookingLog.is_verified = false;
        bookingLog.payment_status = booking_logs_entity_1.PaymentStatus.PENDING;
        bookingLog.transaction_id = null;
        bookingLog.created_at = new Date();
        bookingLog.updated_at = new Date();
        return this.dataSource.getRepository(booking_logs_entity_1.BookingLog).save(bookingLog);
    }
    async getBookingLogByBookingLogId(reqParams) {
        const { bookingRefId } = reqParams;
        if (!bookingRefId) {
            throw new Error('Booking log ID is required');
        }
        const bookingLog = await this.dataSource.getRepository(booking_logs_entity_1.BookingLog).findOne({ where: { booking_reference_id: bookingRefId, is_verified: false } });
        if (!bookingLog) {
            throw new Error(`Booking log not found with ID: ${bookingRefId}`);
        }
        return bookingLog;
    }
    async getBookingAdditionalDetailByBookingRefId(reqParams) {
        const { bookingRefId } = reqParams;
        if (!bookingRefId) {
            throw new common_1.HttpException('Booking Ref ID is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const bookingAdditionalDetails = await this.dataSource.getRepository(booking_additional_details_entity_1.BookingAdditionalDetail).findOne({ where: { booking_reference_id: bookingRefId } });
            if (!bookingAdditionalDetails) {
                throw new common_1.HttpException(`Booking Details not found with ID: ${bookingRefId}`, common_1.HttpStatus.NOT_FOUND);
            }
            return bookingAdditionalDetails;
        }
        catch (error) {
            console.error('Error in getBookingAdditionalDetailByBookingRefId service method:', error);
            throw error;
        }
    }
    async createBookingAdditionalDetail(reqParams) {
        const { bookingId, bookingRefId, supplierDetails, apiResponse, searchReqId, bookingItem = 1 } = reqParams;
        const additionalDetail = new booking_additional_details_entity_1.BookingAdditionalDetail();
        const supplierResponse = {
            bookSupplierResponse: [
                {
                    request: supplierDetails.supplierRequest,
                    response: supplierDetails.supplierResponse,
                }
            ],
            orderDetailsSupplierResponse: [
                supplierDetails.supplierOrderDetails
            ]
        };
        additionalDetail.booking_id = bookingId;
        additionalDetail.booking_reference_id = bookingRefId;
        additionalDetail.booking_item = bookingItem;
        additionalDetail.add_booking_type = booking_additional_details_entity_1.AddBookingType.DEFAULT_BOOKING;
        const convertApiResponseOrderDetails = await this.convertBookingResponse(apiResponse.orderDetails[0], searchReqId);
        const { orderDetails, ...rest } = apiResponse;
        const bookingDetails = await this.getBookingByBookingId({ bookingRefId });
        const finalOrderDetails = {
            bookingId,
            status: String(bookingDetails.booking_status),
            bookingReferenceId: bookingRefId,
            paxes: bookingDetails.paxes,
            contactDetails: bookingDetails.contact_details,
            ...convertApiResponseOrderDetails
        };
        const updateApiResponseObject = {
            ...rest,
            orderDetails: [finalOrderDetails],
        };
        additionalDetail.supplier_response = supplierResponse;
        additionalDetail.api_response = updateApiResponseObject;
        additionalDetail.room_info = convertApiResponseOrderDetails.roomInfo;
        additionalDetail.created_at = new Date();
        additionalDetail.updated_at = new Date();
        return this.dataSource.getRepository(booking_additional_details_entity_1.BookingAdditionalDetail).save(additionalDetail);
    }
    async updateBookingLogData(reqParams) {
        const { bookingLogId, data } = reqParams;
        const bookingLog = await this.dataSource.getRepository(booking_logs_entity_1.BookingLog).findOne({ where: { id: bookingLogId } });
        if (!bookingLog) {
            throw new Error('Booking log not found');
        }
        bookingLog.data = data;
        return this.dataSource.getRepository(booking_logs_entity_1.BookingLog).save(bookingLog);
    }
    async verifyBookingLog(reqParams) {
        const { bookingRefId } = reqParams;
        if (!bookingRefId) {
            throw new Error('Booking log ID is required');
        }
        const bookingLog = await this.dataSource.getRepository(booking_logs_entity_1.BookingLog).findOne({ where: { booking_reference_id: bookingRefId } });
        if (!bookingLog) {
            throw new Error(`Booking log not found with ID: ${bookingRefId}`);
        }
        bookingLog.is_verified = true;
        bookingLog.payment_status = booking_logs_entity_1.PaymentStatus.CAPTURED;
        bookingLog.updated_at = new Date();
        return this.dataSource.getRepository(booking_logs_entity_1.BookingLog).save(bookingLog);
    }
    async updateBookingWithSupplierDetails(reqParams) {
        const { bookingId, supplierDetails, apiResponse, bookingItem = 1 } = reqParams;
        const booking = await this.findOne({ where: { booking_id: bookingId } });
        if (!booking) {
            throw new Error('Booking not found');
        }
        booking.supplier_reference_id = supplierDetails.supplierResponse.BookingId;
        if (supplierDetails.supplierResponse.HotelBookingStatus === 'Confirmed') {
            booking.booking_status = bookings_entity_1.BookingStatus.CONFIRMED;
        }
        else {
            booking.booking_status = bookings_entity_1.BookingStatus.PENDING;
        }
        booking.module_type = 2;
        booking.booking_from = bookings_entity_1.BookingFrom.WEB;
        booking.updated_at = new Date();
        const savedBooking = await this.save(booking);
        if (apiResponse && supplierDetails) {
            try {
                await this.createBookingAdditionalDetail({
                    bookingId,
                    bookingRefId: savedBooking.booking_reference_id,
                    supplierDetails,
                    apiResponse,
                    searchReqId: booking.search_id,
                    bookingItem,
                });
            }
            catch (error) {
                console.error('Error creating booking additional details:', error);
            }
        }
        return savedBooking;
    }
    async updateBookingWithSupplierFailed(reqParams) {
        const { bookingId, supplierDetails } = reqParams;
        const booking = await this.findOne({ where: { booking_id: bookingId } });
        if (!booking) {
            throw new Error('Booking not found');
        }
        booking.failure_reason = bookings_entity_1.FailureReason.SUPPLIER_API;
        booking.module_type = 2;
        booking.booking_from = bookings_entity_1.BookingFrom.WEB;
        booking.updated_at = new Date();
        const savedBooking = await this.save(booking);
        return savedBooking;
    }
    calculateNights(checkIn, checkOut) {
        const checkInDate = new Date(checkIn).getTime();
        const checkOutDate = new Date(checkOut).getTime();
        return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    }
    parsePriceHash(inputStr) {
        let splitStr = inputStr.split('_');
        return {
            supplierCode: splitStr[0],
            hotelCode: splitStr[1],
            price: parseFloat(splitStr[2]),
            tax: parseFloat(splitStr[3]),
            searchReqId: splitStr[4]
        };
    }
    async getHotelDetails(reqParams) {
        const hotelCode = reqParams;
        const hotelDetails = await this.dataSource.getRepository(tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity).findOne({
            where: { hotelCode: hotelCode },
        });
        return hotelDetails ? hotelDetails : {};
    }
    async convertBookingResponse(apiResponse, searchReqId) {
        const hotelDetails = await this.getHotelDetails(apiResponse.TBOHotelCode);
        const hotelImage = hotelDetails.heroImage || '';
        const hotelDescription = hotelDetails.description || '';
        const hotelPhone = hotelDetails.hotelPhones;
        const hotelCountry = hotelDetails.country;
        const hotelImages = hotelImage ? [{
                thumbnail: '',
                small: '',
                standard: hotelImage,
                bigger: '',
                xl: '',
                xxl: '',
                original: hotelImage,
            }] : [];
        const booking = {
            supplierBookingId: apiResponse.BookingId,
            remarks: apiResponse.RateConditions || "",
            bookingDate: apiResponse.BookingDate,
            checkIn: apiResponse.CheckInDate,
            checkOut: apiResponse.CheckOutDate,
            numberOfNights: this.calculateNights(apiResponse.CheckInDate, apiResponse.CheckOutDate),
            hotel: {
                hotelId: apiResponse.TBOHotelCode || "",
                name: apiResponse.HotelName,
                rating: {
                    stars: apiResponse.StarRating,
                    reviewScore: '',
                },
                address: `${apiResponse.AddressLine1 || ""} ${apiResponse.AddressLine2 || ""}`.trim(),
                phones: hotelPhone,
                location: {
                    geoLocation: {
                        latitude: apiResponse.Latitude,
                        longitude: apiResponse.Longitude,
                    },
                    city: apiResponse.City,
                    state: apiResponse.State || '',
                    country: hotelCountry,
                    countryCode: apiResponse.CountryCode,
                },
                description: hotelDescription,
                images: hotelImages,
            },
            prices: {
                selling: generic_utility_1.Generic.currencyConversion(apiResponse.NetAmount, 'INR', 'INR') || 0,
                currency: 'INR',
                taxIncluded: true,
                taxes: generic_utility_1.Generic.currencyConversion(apiResponse.NetTax, 'INR', 'INR') || 0,
                priceHash: `TBO_${apiResponse.TBOHotelCode}_${apiResponse.NetAmount}_${apiResponse.NetTax}_${searchReqId}`,
            },
            roomInfo: [],
            isRefundable: (() => {
                const bookingDate = new Date(apiResponse.BookingDate);
                const policies = apiResponse.Rooms[0].CancelPolicies || [];
                const refundablePolicy = policies.find((policy) => {
                    const from = new Date(policy.FromDate);
                    const to = new Date(policy.ToDate);
                    return (bookingDate >= from &&
                        bookingDate <= to &&
                        Number(policy.CancellationCharge) === 0);
                });
                return !!refundablePolicy;
            })(),
            termsCancellationPolicy: apiResponse.Rooms[0].CancellationPolicy || null,
        };
        if (apiResponse.Rooms && Array.isArray(apiResponse.Rooms)) {
            apiResponse.Rooms.forEach(room => {
                const roomObj = {
                    roomName: room.RoomTypeName,
                    ratePlanCode: room.RatePlanCode,
                    roomCode: room.RoomTypeCode || '',
                    boardCode: '',
                    boardInfo: '',
                    rooms: 1,
                    adults: room.AdultCount,
                    children: room.ChildCount || 0,
                    childAges: room.ChildAge || [],
                    nightlyRates: this.transformDayRatesToNightly(room.DayRates || []),
                    inclusion: room.Inclusion || "",
                    roomDescription: room.RoomDescription,
                    cancellationPolicy: {
                        refundable: (() => {
                            const bookingDate = new Date(apiResponse.BookingDate);
                            const policies = room.CancelPolicies || [];
                            const refundablePolicy = policies.find((policy) => {
                                const from = new Date(policy.FromDate);
                                const to = new Date(policy.ToDate);
                                return (bookingDate >= from &&
                                    bookingDate <= to &&
                                    Number(policy.CancellationCharge) === 0);
                            });
                            return !!refundablePolicy;
                        })(),
                        currency: room.CancelPolicies[0].Currency || '',
                        penalties: room.CancelPolicies || [],
                    },
                    supplements: room.Supplements || [],
                    amenity: room.Amenities,
                };
                booking.roomInfo.push(roomObj);
            });
        }
        return booking;
    }
    transformDayRatesToNightly(dayRates) {
        if (!dayRates || dayRates.length === 0) {
            return [];
        }
        return dayRates.map(rate => ({
            price: rate.Amount.toFixed(2),
            dateYmd: rate.Date.split('T')[0]
        }));
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BookRepository);
//# sourceMappingURL=book.repository.js.map