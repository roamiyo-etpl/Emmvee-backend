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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const provider_book_service_1 = require("../providers/provider-book.service");
const book_interface_1 = require("./interfaces/book.interface");
const book_repository_1 = require("./book.repository");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
const uuid_1 = require("uuid");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
const revalidate_service_1 = require("../revalidate/revalidate.service");
let BookService = class BookService {
    providerBookService;
    bookRepository;
    revalidateService;
    constructor(providerBookService, bookRepository, revalidateService) {
        this.providerBookService = providerBookService;
        this.bookRepository = bookRepository;
        this.revalidateService = revalidateService;
    }
    async bookingInitiate(reqParams) {
        const { bookReq, headers } = reqParams;
        const userId = (0, uuid_1.v4)();
        try {
            let fare = [];
            const adultCount = bookReq.passengers.filter((p) => p.passengerType === 'ADT').length;
            const childrenCount = bookReq.passengers.filter((p) => p.passengerType === 'CHD').length;
            const infantCount = bookReq.passengers.filter((p) => p.passengerType === 'INF').length;
            bookReq.paxes = [
                {
                    adult: adultCount,
                    children: childrenCount,
                    infant: infantCount,
                },
            ];
            const revalidateResult = await this.revalidateService.revalidate(bookReq, headers);
            if (revalidateResult.error) {
                return {
                    error: true,
                    message: 'Revalidation failed',
                    booking_log_id: '',
                    search_req_id: bookReq.searchReqId,
                    booking_id: '',
                    fare: [],
                };
            }
            fare = revalidateResult.route?.fare;
            const mwrLogId = generic_utility_1.Generic.generateRandomString(10);
            const booking = await this.bookRepository.insertBooking({ booking: bookReq, userId, mwrLogId });
            const bookingLog = await this.bookRepository.storeBookingLog({ bookingRefId: booking.booking_reference_id, userId, mwrLogId });
            await this.bookRepository.updateBookingLogData({ bookingLogId: bookingLog.id, data: { originalBookRequest: bookReq } });
            return {
                error: false,
                message: 'Booking initiated successfully',
                booking_log_id: bookingLog.log_id,
                search_req_id: bookReq.searchReqId,
                booking_id: booking.booking_id,
                fare: fare,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: 'Booking initiated failed',
                booking_log_id: '',
                search_req_id: bookReq.searchReqId,
                booking_id: '',
                fare: [],
            };
        }
    }
    async bookingConfirmation(reqParams) {
        const { bookReq, headers } = reqParams;
        let booking = new bookings_entity_1.Booking();
        try {
            booking = await this.bookRepository.getBookingByBookingId({ bookingId: bookReq.bookingId });
            console.log('Booking found:', booking.booking_id);
            console.log('bookReq.bookingLogId', bookReq.bookingLogId);
            const bookingLog = await this.bookRepository.getBookingLogByBookingLogId({ bookingLogId: bookReq.bookingLogId });
            console.log('Booking log found:', bookingLog.id);
            await this.bookRepository.verifyBookingLog({ bookingLogId: bookReq.bookingLogId });
            const originalBookRequest = bookingLog.data?.originalBookRequest;
            console.log('originalBookRequest', originalBookRequest);
            if (!originalBookRequest) {
                throw new Error('Original booking request not found in booking log');
            }
            const supplierDetails = await this.providerBookService.providerBook({ bookReq: originalBookRequest, headers, logId: bookReq.bookingLogId });
            console.log('supplierDetails', supplierDetails);
            const response = new book_interface_1.BookResponse();
            Object.assign(response, {
                error: supplierDetails.error,
                message: supplierDetails.message,
                mode: supplierDetails.mode,
                searchReqId: supplierDetails.searchReqId,
                supplierMessage: supplierDetails.supplierMessage,
                orderDetail: supplierDetails.orderDetail ?? [],
            });
            await this.bookRepository.updateBookingWithSupplierDetails({
                bookingId: booking.booking_id,
                supplierDetails,
                bookingData: { request: originalBookRequest, response },
                supplierResponse: { bookSupplierResponse: supplierDetails.rawSupplierResponse, orderDetailsSupplierResponse: supplierDetails.supplierOrderDetailResponse },
                bookingItem: 1,
            });
            if (response.error) {
                await this.bookRepository.BookingStatusFailed(booking.booking_id);
            }
            return response;
        }
        catch (error) {
            console.error('Booking confirmation error:', error);
            if (booking) {
                await this.bookRepository.BookingStatusFailed(booking.booking_id);
            }
            throw new common_1.BadRequestException({
                message: 'Booking confirmation failed',
                error: error.message,
                details: error,
            });
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_book_service_1.ProviderBookService,
        book_repository_1.BookRepository,
        revalidate_service_1.RevalidateService])
], BookService);
//# sourceMappingURL=book.service.js.map