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
exports.ProviderBalanceService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../configuration/configuration.service");
let ProviderBalanceService = class ProviderBalanceService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async providerBalanceCheck(balanceReq) {
        if (balanceReq.mode.toLowerCase() == 'test' || balanceReq.mode.toLowerCase() == 'production') {
            const providerConfig = await this.configService.getConfiguration({ supplierCode: balanceReq.providerCode.toUpperCase(), mode: balanceReq.mode, module: 'Flight' });
            if (!providerConfig) {
                throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
            }
            const balanceRequest = [];
            let balanceResult;
            balanceRequest['balanceReq'] = balanceReq;
            balanceRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
            switch (balanceReq.providerCode.toUpperCase()) {
                case 'QN':
                    break;
                default:
                    throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
            }
            return balanceResult;
        }
        else {
            throw new common_1.BadRequestException("mode should be 'test' or 'production'");
        }
    }
};
exports.ProviderBalanceService = ProviderBalanceService;
exports.ProviderBalanceService = ProviderBalanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], ProviderBalanceService);
//# sourceMappingURL=provider-balance.service.js.map