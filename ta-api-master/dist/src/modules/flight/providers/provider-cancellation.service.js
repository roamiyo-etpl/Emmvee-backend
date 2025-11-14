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
exports.ProviderCancellationService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../configuration/configuration.service");
const tbo_cancellation_service_1 = require("./tbo/tbo-cancellation.service");
let ProviderCancellationService = class ProviderCancellationService {
    configService;
    tboCancellationService;
    constructor(configService, tboCancellationService) {
        this.configService = configService;
        this.tboCancellationService = tboCancellationService;
    }
    async providerCancel(reqParams) {
        const { cancelReq, headers, booking } = reqParams;
        if (!booking || cancelReq.bookingId.toString() !== (booking.supplier_reference_id || '').toString()) {
            throw new common_1.NotFoundException('Booking mismatch: bookingId does not match supplier reference id');
        }
        const providerCode = (booking.supplier_name || '').toUpperCase();
        const providerConfig = await this.configService.getConfiguration(providerCode);
        if (!providerConfig) {
            throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
        }
        const cancelRequest = [];
        cancelRequest['cancelReq'] = cancelReq;
        cancelRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
        cancelRequest['headers'] = headers;
        cancelRequest['booking'] = booking;
        let cancelResult = null;
        if (providerCode === 'TBO') {
            cancelResult = await this.tboCancellationService.cancel(cancelRequest);
        }
        if (!cancelResult) {
            throw new common_1.NotFoundException(`Provider ${providerCode || 'UNKNOWN'} is not supported for cancellation`);
        }
        return cancelResult;
    }
    async providerCancellationCharges(reqParams) {
        const { cancelReq, headers, booking } = reqParams;
        if (!booking || cancelReq.bookingId.toString() !== (booking.supplier_reference_id || '').toString()) {
            throw new common_1.NotFoundException('Booking mismatch: bookingId does not match supplier reference id');
        }
        const providerCode = (booking.supplier_name || '').toUpperCase();
        const providerConfig = await this.configService.getConfiguration(providerCode);
        if (!providerConfig) {
            throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
        }
        const cancelRequest = [];
        cancelRequest['cancelReq'] = cancelReq;
        cancelRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
        cancelRequest['headers'] = headers;
        if (providerCode === 'TBO') {
            return this.tboCancellationService.fetchCancellationCharges(cancelRequest);
        }
        throw new common_1.NotFoundException(`Provider ${providerCode || 'UNKNOWN'} is not supported for cancellation charges`);
    }
};
exports.ProviderCancellationService = ProviderCancellationService;
exports.ProviderCancellationService = ProviderCancellationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService,
        tbo_cancellation_service_1.TboCancellationService])
], ProviderCancellationService);
//# sourceMappingURL=provider-cancellation.service.js.map