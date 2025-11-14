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
exports.ProviderOrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../configuration/configuration.service");
const tbo_order_detail_service_1 = require("./tbo/tbo-order-detail.service");
let ProviderOrderDetailService = class ProviderOrderDetailService {
    configService;
    tboOrderService;
    constructor(configService, tboOrderService) {
        this.configService = configService;
        this.tboOrderService = tboOrderService;
    }
    async providerOrderDetail(reqParams) {
        const { orderDetailDto, headers } = reqParams;
        if (orderDetailDto.mode.toLowerCase() == 'test' || orderDetailDto.mode.toLowerCase() == 'production') {
            const providerConfig = await this.configService.getConfiguration({ supplierCode: orderDetailDto.providerCode.toUpperCase(), mode: orderDetailDto.mode.toLowerCase(), module: 'Flight' });
            if (!providerConfig) {
                throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
            }
            const orderRequest = [];
            let orderResult;
            orderRequest['orderReq'] = orderDetailDto;
            orderRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
            orderRequest['headers'] = headers || { 'ip-address': '127.0.0.1' };
            switch (orderDetailDto.providerCode.toUpperCase()) {
                case 'TBO':
                    orderResult = this.tboOrderService.getOrderDetails(orderRequest);
                    break;
            }
            return orderResult;
        }
        else {
            throw new common_1.BadRequestException("mode should be 'test' or 'production'");
        }
    }
};
exports.ProviderOrderDetailService = ProviderOrderDetailService;
exports.ProviderOrderDetailService = ProviderOrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService,
        tbo_order_detail_service_1.TboOrderDetailService])
], ProviderOrderDetailService);
//# sourceMappingURL=provider-order-detail.service.js.map