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
const tbo_order_detail_service_1 = require("./tbo/tbo-order-detail.service");
let ProviderOrderDetailService = class ProviderOrderDetailService {
    tboOrderDetailService;
    constructor(tboOrderDetailService) {
        this.tboOrderDetailService = tboOrderDetailService;
    }
    async orderDetail(orderReq, headers) {
        const { activeProviders } = orderReq;
        const orderRequest = [];
        const orderResult = [];
        try {
            const activeProvidersName = activeProviders.map((data) => {
                const cred = JSON.parse(data.providerCredentials);
                return cred.provider;
            });
            const language = headers['language']?.toUpperCase() || 'en';
            Object.assign(orderReq, { currency: headers['currency-preference']?.toUpperCase() || 'USD' });
            Object.assign(orderReq, { language: language });
            orderRequest['language'] = language;
            orderRequest['bookReq'] = orderReq;
            if (activeProvidersName.indexOf('TBO') !== -1) {
                console.log('TBO found for book detail');
                const tboCred = activeProviders.filter((item) => {
                    const cred = JSON.parse(item.providerCredentials);
                    return cred.provider == 'TBO';
                });
                if (tboCred.length > 0) {
                    orderRequest['assignedId'] = tboCred[0]?.assignedId;
                    orderRequest['providerCred'] = tboCred[0]?.providerCredentials;
                    const tboOrderResult = await this.tboOrderDetailService.orderDetail(orderReq, JSON.parse(tboCred[0]?.providerCredentials), headers);
                    orderResult.push(tboOrderResult);
                }
            }
            const result = orderResult;
            console.log(orderResult);
            return Array.isArray(result) ? result[0] : result;
        }
        catch (error) {
            console.log('supplier book detail error', error);
            throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
        }
    }
};
exports.ProviderOrderDetailService = ProviderOrderDetailService;
exports.ProviderOrderDetailService = ProviderOrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbo_order_detail_service_1.TboOrderDetailService])
], ProviderOrderDetailService);
//# sourceMappingURL=provider-order-detail.service.js.map