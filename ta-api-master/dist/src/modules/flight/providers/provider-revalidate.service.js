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
exports.ProviderRevalidateService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../configuration/configuration.service");
const tbo_revalidate_service_1 = require("./tbo/tbo-revalidate.service");
let ProviderRevalidateService = class ProviderRevalidateService {
    configService;
    tboRevalidateService;
    constructor(configService, tboRevalidateService) {
        this.configService = configService;
        this.tboRevalidateService = tboRevalidateService;
    }
    async providerRevalidate(revalidateReq, headers) {
        const providerConfig = await this.configService.getConfiguration({ supplierCode: revalidateReq.providerCode.toUpperCase(), mode: '', module: 'Flight' });
        if (!providerConfig) {
            throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
        }
        const revalidateRequest = [];
        let revalidateResult;
        revalidateRequest['revalidateReq'] = revalidateReq;
        revalidateRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
        revalidateRequest['headers'] = headers;
        if (revalidateReq.isMultiReValid && revalidateReq.isMultiReValid == true) {
            revalidateResult = this.multiRevalidation(revalidateRequest);
        }
        else {
            revalidateResult = this.singleRevalidation(revalidateRequest);
        }
        return revalidateResult;
    }
    singleRevalidation(revalidateRequest) {
        const { revalidateReq } = revalidateRequest;
        let revalidateResult;
        switch (revalidateReq.providerCode.toUpperCase()) {
            case 'TBO':
                revalidateResult = this.tboRevalidateService.revalidate(revalidateRequest);
                break;
        }
        return revalidateResult;
    }
    async multiRevalidation(revalidateRequest) {
        const { revalidateReq } = revalidateRequest;
        const groupHash = revalidateReq.groupHash ? revalidateReq.groupHash : [];
        let revalidateResult;
        if (groupHash.length > 1) {
            for (const element of groupHash) {
                revalidateReq.providerCode = element.provider;
                revalidateReq.solutionId = element.solutionId;
                const providerConfig = await this.configService.getConfiguration({ supplierCode: revalidateReq.providerCode.toUpperCase(), mode: '', module: 'Flight' });
                if (!providerConfig) {
                    throw new common_1.NotFoundException('Provider code is not valid, Check your provider code and try again.');
                }
                revalidateRequest['providerCred'] = JSON.parse(providerConfig.provider_credentials);
                revalidateResult = await this.singleRevalidation(revalidateRequest);
                if (revalidateResult.isValid) {
                    break;
                }
            }
        }
        else {
            revalidateResult = await this.singleRevalidation(revalidateRequest);
        }
        return revalidateResult;
    }
};
exports.ProviderRevalidateService = ProviderRevalidateService;
exports.ProviderRevalidateService = ProviderRevalidateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService,
        tbo_revalidate_service_1.TboRevalidateService])
], ProviderRevalidateService);
//# sourceMappingURL=provider-revalidate.service.js.map