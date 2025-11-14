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
exports.ProviderBookService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../configuration/configuration.service");
const tbo_book_service_1 = require("./tbo/tbo-book.service");
const provider_order_detail_service_1 = require("./provider-order-detail.service");
const order_detail_dto_1 = require("../order-details/dtos/order-detail.dto");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
let ProviderBookService = class ProviderBookService {
    configService;
    tboBookService;
    providerOrderDetailService;
    constructor(configService, tboBookService, providerOrderDetailService) {
        this.configService = configService;
        this.tboBookService = tboBookService;
        this.providerOrderDetailService = providerOrderDetailService;
    }
    async providerBook(reqParams) {
        const { bookReq, headers, logId } = reqParams;
        const providerConfig = await this.configService.getConfiguration({ supplierCode: bookReq.providerCode.toUpperCase(), mode: '', module: 'Flight' });
        if (!providerConfig) {
            throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
        }
        const bookRequest = [];
        let bookResult;
        bookRequest['bookReq'] = bookReq;
        bookRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
        bookRequest['headers'] = headers;
        bookRequest['logId'] = logId;
        switch (bookReq.providerCode.toUpperCase()) {
            case 'TBO':
                bookResult = await this.tboBookService.book(bookRequest);
                break;
        }
        if (bookResult && !bookResult.error && bookResult.orderDetail && bookResult.orderDetail.length > 0) {
            try {
                const orderDetailDto = this.buildOrderDetailDto({ bookReq, bookResult });
                const { orderDetails, supplierOrderDetailResponse } = await this.providerOrderDetailService.providerOrderDetail({ orderDetailDto, headers });
                bookResult.orderDetails = orderDetails;
                bookResult.supplierOrderDetailResponse = supplierOrderDetailResponse;
            }
            catch (error) {
                console.error('Error fetching order details:', error);
            }
        }
        return bookResult;
    }
    buildOrderDetailDto(reqParams) {
        const { bookReq, bookResult } = reqParams;
        const orderDetailDto = new order_detail_dto_1.OrderDetailDto();
        orderDetailDto.providerCode = bookReq.providerCode;
        orderDetailDto.searchReqId = bookReq.searchReqId;
        orderDetailDto.mode = bookResult.mode.split('-').pop().toLowerCase();
        orderDetailDto.bookingDetails = bookResult.orderDetail.map((order) => ({
            orderStatus: this.mapOrderStatus(order.orderStatus),
            pnr: order.pnr || '',
            orderNo: order.orderNo,
            firstName: bookReq.passengers[0]?.passengerDetail?.firstName || '',
            lastName: bookReq.passengers[0]?.passengerDetail?.lastName || '',
        }));
        orderDetailDto.searchAirLegs = [];
        bookReq.routes.forEach((route) => {
            if (route && route.length > 0) {
                const firstSegment = route[0];
                const lastSegment = route[route.length - 1];
                orderDetailDto.searchAirLegs.push({
                    origin: firstSegment.departureCode,
                    destination: lastSegment.arrivalCode,
                    departureDate: firstSegment.departureDate,
                });
            }
        });
        return orderDetailDto;
    }
    mapOrderStatus(status) {
        const normalizedStatus = status?.toUpperCase();
        return bookings_entity_1.BookingStatus[normalizedStatus] ?? bookings_entity_1.BookingStatus.PENDING;
    }
};
exports.ProviderBookService = ProviderBookService;
exports.ProviderBookService = ProviderBookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService,
        tbo_book_service_1.TboBookService,
        provider_order_detail_service_1.ProviderOrderDetailService])
], ProviderBookService);
//# sourceMappingURL=provider-book.service.js.map