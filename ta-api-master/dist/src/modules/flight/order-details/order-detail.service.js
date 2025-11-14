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
exports.OrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const provider_order_detail_service_1 = require("../providers/provider-order-detail.service");
const order_detail_repository_1 = require("./order-detail.repository");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
let OrderDetailService = class OrderDetailService {
    providerOrderDetailService;
    orderDetailRepository;
    constructor(providerOrderDetailService, orderDetailRepository) {
        this.providerOrderDetailService = providerOrderDetailService;
        this.orderDetailRepository = orderDetailRepository;
    }
    async getOrderDetails(orderReq, headers) {
        let { orderDetails, supplierOrderDetailResponse } = await this.providerOrderDetailService.providerOrderDetail({ orderReq, headers });
        return {
            orderDetails: orderDetails,
            supplierOrderDetailResponse: supplierOrderDetailResponse,
        };
    }
    async updateBookingStatus() {
        const pendingBookings = await this.orderDetailRepository.getAllPendingBookings();
        console.log(pendingBookings);
        for (const booking of pendingBookings) {
            if (booking.created_at < new Date(Date.now() - 2 * 60 * 60 * 1000)) {
            }
            const orderDetailsData = booking.bookingAdditionalDetails?.api_response?.orderDetails || [];
            if (!orderDetailsData.length)
                continue;
            const isDomesticRoundTrip = orderDetailsData.length > 1;
            if (isDomesticRoundTrip) {
                const anyFailed = orderDetailsData.some((order) => order.orderStatus === 'FAILED');
                if (anyFailed) {
                    await this.orderDetailRepository.updateBookingStatus(booking.booking_id, bookings_entity_1.BookingStatus.PENDING);
                    continue;
                }
            }
            const bookingDetailsArray = orderDetailsData.map((order) => ({
                pnr: order.pnr,
                orderNo: order.orderNo,
                firstName: booking.contact_details.firstName,
                lastName: booking.contact_details.lastName,
            }));
            const { orderDetails } = await this.providerOrderDetailService.providerOrderDetail({
                orderDetailDto: this.createOrderDetailRequest(booking, bookingDetailsArray),
                headers: { 'ip-address': '127.0.0.1' },
            });
            const bookingStatus = orderDetails?.[0]?.bookingStatus || 'PENDING';
            await this.orderDetailRepository.updateBookingStatus(booking.booking_id, bookings_entity_1.BookingStatus[bookingStatus.toUpperCase()]);
        }
        return;
    }
    createOrderDetailRequest(booking, bookingDetails) {
        return {
            providerCode: booking.supplier_name,
            mode: 'Test',
            bookingDetails,
            searchReqId: booking.search_id,
        };
    }
    async updateInProgressToFailed() {
        const inProgressBookings = await this.orderDetailRepository.getInProgressBookings();
        console.log(inProgressBookings.length);
        for (const booking of inProgressBookings) {
            await this.orderDetailRepository.updateInProgressToFailed(booking.booking_id);
        }
        return;
    }
};
exports.OrderDetailService = OrderDetailService;
exports.OrderDetailService = OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_order_detail_service_1.ProviderOrderDetailService,
        order_detail_repository_1.OrderDetailRepository])
], OrderDetailService);
//# sourceMappingURL=order-detail.service.js.map