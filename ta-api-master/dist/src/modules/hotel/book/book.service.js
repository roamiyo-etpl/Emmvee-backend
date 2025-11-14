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
var HotelBookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelBookService = void 0;
const common_1 = require("@nestjs/common");
const provider_book_service_1 = require("../providers/provider-book.service");
const room_service_1 = require("../room/room.service");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
const book_repository_1 = require("./book.repository");
const uuid_1 = require("uuid");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
let HotelBookService = HotelBookService_1 = class HotelBookService {
    providerBookService;
    hotelRoomService;
    bookRepository;
    supplierCred;
    logger = new common_1.Logger(HotelBookService_1.name);
    constructor(providerBookService, hotelRoomService, bookRepository, supplierCred) {
        this.providerBookService = providerBookService;
        this.hotelRoomService = hotelRoomService;
        this.bookRepository = bookRepository;
        this.supplierCred = supplierCred;
    }
    async initiate(bookDto, headers) {
        const { hotelId, searchReqId, supplierCode, rateKey, passengers, contactDetails } = bookDto;
        console.log(bookDto, 'hdhd');
        const roomValidationPayload = {
            hotelId,
            searchReqId,
            supplierCode,
            roomBookingInfo: [
                {
                    rateKey
                }
            ],
        };
        try {
            const roomQuote = await this.hotelRoomService.getHotelRoomQuote(roomValidationPayload, headers);
            if (roomQuote.status !== 'AVAILABLE') {
                throw new common_1.BadRequestException({
                    success: false,
                    searchReqId: searchReqId,
                    message: roomQuote.status,
                });
            }
            const validationResult = this.validatePassengerDocuments(passengers, roomQuote.validationInfo);
            if (!validationResult.valid) {
                throw new common_1.BadRequestException({
                    success: false,
                    searchReqId: searchReqId,
                    message: validationResult.errors,
                });
            }
            const mwrLogId = generic_utility_1.Generic.generateRandomString(10);
            const userId = (0, uuid_1.v4)();
            const currency = String(headers['currency-preference'] ?? 'INR');
            const transformedPaxes = this.transformPaxesData(passengers, contactDetails.email, contactDetails.mobileNo, contactDetails.dialCode);
            const booking = await this.bookRepository.insertBooking({ booking: bookDto, transformedPaxes, userId, mwrLogId, hotel: roomQuote, searchReqId });
            const bookingLog = await this.bookRepository.storeBookingLog({ bookingRefId: booking.booking_reference_id, userId, mwrLogId });
            await this.bookRepository.updateBookingLogData({ bookingLogId: bookingLog.id, data: { originalBookRequest: bookDto, roomQuoteResponse: roomQuote } });
            return {
                success: true,
                searchReqId: searchReqId,
                message: 'Book initiate successful',
                bookingRefId: booking.booking_reference_id,
                price: roomQuote.prices,
            };
        }
        catch (error) {
            this.logger.error('Hotel Book failed:', error);
            throw error;
        }
    }
    async bookConfirmation(bookReq, headers) {
        const { bookingRefId, searchReqId, paymentLogId } = bookReq;
        try {
            const booking = await this.bookRepository.getBookingByBookingId({ bookingRefId: bookingRefId });
            const bookingLog = await this.bookRepository.getBookingLogByBookingLogId({ bookingRefId: bookingRefId });
            await this.bookRepository.verifyBookingLog({ bookingRefId: bookingRefId });
            const originalBookRequestResponse = bookingLog.data;
            if (!originalBookRequestResponse) {
                throw new Error('Original booking request not found in booking log');
            }
            const providersData = await this.supplierCred.getActiveProviders(headers);
            const activeProviders = providersData.map((data) => ({
                providerId: data.provider_id,
                code: data.code,
                assignedId: data.provider_id,
                providerCredentials: data.provider_credentials,
            }));
            Object.assign(originalBookRequestResponse, { activeProviders: activeProviders });
            const supplierDetailsResponse = await this.providerBookService.bookConfirmation(originalBookRequestResponse, headers);
            const { success, errorCode, message, ...supplierDetails } = supplierDetailsResponse;
            if (supplierDetailsResponse.success && supplierDetailsResponse.errorCode === 0) {
                const apiResponse = {
                    booking: {
                        request: bookingLog.data.originalBookRequest,
                        response: {
                            success: true,
                            message: 'Book confirmation successful',
                            bookingStatus: supplierDetails.supplierResponse.HotelBookingStatus,
                            bookingRefId: bookingRefId,
                            searchReqId: searchReqId,
                            supplierBookingId: supplierDetails.supplierResponse.BookingId,
                        },
                    },
                    orderDetails: [
                        supplierDetailsResponse.supplierOrderDetails
                    ]
                };
                await this.bookRepository.updateBookingWithSupplierDetails({
                    bookingId: booking.booking_id,
                    supplierDetails,
                    apiResponse: apiResponse,
                    bookingItem: 1,
                });
                return {
                    success: true,
                    message: 'Book confirmation successful',
                    bookingStatus: supplierDetails.supplierResponse.HotelBookingStatus,
                    bookingRefId: bookingRefId,
                    searchReqId: searchReqId,
                    supplierBookingId: supplierDetails.supplierResponse.BookingId,
                };
            }
            else {
                await this.bookRepository.updateBookingWithSupplierFailed({
                    bookingId: booking.booking_id,
                    supplierDetails,
                });
                return {
                    success: false,
                    message: message,
                    bookingStatus: 'failed',
                    bookingRefId: bookingRefId,
                    searchReqId: searchReqId,
                    supplierBookingId: '',
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({
                success: false,
                message: 'Booking confirmation failed',
                bookingStatus: 'failed',
                bookingRefId: bookingRefId,
                searchReqId: searchReqId,
                supplierBookingId: '',
            });
        }
    }
    async getBookingDetails(bookingRefId, headers) {
        try {
            const bookingData = await this.bookRepository.getBookingAdditionalDetailByBookingRefId({ bookingRefId });
            if (!bookingData) {
                throw new common_1.HttpException(`Booking not found with bookingRefId: ${bookingRefId}`, common_1.HttpStatus.NOT_FOUND);
            }
            return bookingData.api_response.orderDetails[0];
        }
        catch (error) {
            console.error('Error in getBookingDetails service method:', error);
            throw error;
        }
    }
    transformPaxesData(paxes, globalEmail, globalMobileNo, globalDialCode) {
        const initialPaxesData = {
            adult: { count: 0, data: [] },
            child: { count: 0, data: [] },
            infant: { count: 0, data: [] },
        };
        paxes.forEach((pax) => {
            const { type, ...paxData } = pax;
            if (!paxData.email && globalEmail) {
                paxData.email = globalEmail;
            }
            if (!paxData.mobileNo && globalMobileNo) {
                paxData.mobileNo = globalMobileNo;
            }
            if (!paxData.dialCode && globalDialCode) {
                paxData.dialCode = globalDialCode;
            }
            if (!paxData.age && paxData.dob) {
                const calculatedAge = this.calculateAgeFromDob(paxData.dob);
                paxData.age = calculatedAge;
            }
            if (type === 'adult') {
                initialPaxesData.adult.count++;
                initialPaxesData.adult.data?.push(paxData);
            }
            else if (type === 'child') {
                initialPaxesData.child.count++;
                initialPaxesData.child.data = initialPaxesData.child.data || [];
                initialPaxesData.child.data?.push(paxData);
            }
            else if (type === 'infant') {
                initialPaxesData.infant.count++;
                initialPaxesData.infant.data = initialPaxesData.infant.data || [];
                initialPaxesData.infant.data?.push(paxData);
            }
            else {
                throw new common_1.BadRequestException(`Invalid pax type`);
            }
        });
        return initialPaxesData;
    }
    validatePassengerDocuments(passengers, validationInfo) {
        const errors = [];
        if (validationInfo.isPanMandatory) {
            const adultPassengers = passengers.filter((p) => p.type === 'adult');
            const panSet = new Set(adultPassengers.map((p) => p.pan).filter(Boolean));
            if (panSet.size < validationInfo.isPanCountRequired) {
                errors.push(`At least ${validationInfo.isPanCountRequired} unique PAN number(s) required for adults. Found ${panSet.size}.`);
            }
            if (adultPassengers.length > 0 && panSet.size === 0) {
                errors.push('Adult passengers must have valid PAN numbers.');
            }
        }
        if (validationInfo.isPassportMandatory) {
            passengers.forEach((p, i) => {
                if (!p.passportNumber) {
                    errors.push(`Passenger ${p.firstName} ${p.lastName}: Passport number is required.`);
                }
                if (!p.passportIssueDate) {
                    errors.push(`Passenger ${p.firstName} ${p.lastName}: Passport issue date is required.`);
                }
                if (!p.passportExpDate) {
                    errors.push(`Passenger ${p.firstName} ${p.lastName}: Passport expiry date is required.`);
                }
                if (!p.passportIssuingCountry) {
                    errors.push(`Passenger ${p.firstName} ${p.lastName}: Passport expiry date is required.`);
                }
            });
        }
        return { valid: errors.length === 0, errors };
    }
    calculateAgeFromDob(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    }
};
exports.HotelBookService = HotelBookService;
exports.HotelBookService = HotelBookService = HotelBookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_book_service_1.ProviderBookService,
        room_service_1.HotelRoomService,
        book_repository_1.BookRepository,
        supplier_cred_service_1.SupplierCredService])
], HotelBookService);
//# sourceMappingURL=book.service.js.map