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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
const date_utility_1 = require("../../../shared/utilities/flight/date.utility");
const typeorm_2 = require("typeorm");
let ConfigurationService = class ConfigurationService {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async getActiveProviderList({ module }) {
        return await this.providerRepository.find({
            where: {
                is_active: 'Active',
                module_type: module,
            },
        });
    }
    async getConfiguration({ supplierCode, mode, module }) {
        if (supplierCode != '') {
            if (mode == '') {
                return await this.providerRepository.findOne({
                    where: {
                        code: supplierCode,
                        is_active: 'Active',
                        module_type: module,
                    },
                });
            }
            else {
                return await this.providerRepository.findOne({
                    where: {
                        code: supplierCode,
                        provider_mode: mode?.charAt(0)?.toUpperCase() + mode?.slice(1),
                        module_type: module,
                    },
                });
            }
        }
        return null;
    }
    async getToken({ searchRequest, module }) {
        try {
            const currentDate = date_utility_1.DateUtility.currentDateOnlyIST();
            const checkToken = await this.providerRepository.findOne({
                select: ['authToken'],
                where: {
                    code: searchRequest.providerCred.code,
                    tokenUpdatedAt: currentDate,
                    module_type: module,
                },
            });
            return checkToken?.authToken;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('There is an issue while fetching data from the providers.');
        }
    }
    async updateAuthToken({ newAuthToken, searchRequest, module }) {
        try {
            const currentDate = date_utility_1.DateUtility.currentDateOnlyIST();
            await this.providerRepository.update({ code: searchRequest.providerCred?.provider, module_type: module }, { authToken: newAuthToken, tokenUpdatedAt: currentDate });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('There is an issue while fetching data from the providers.');
        }
    }
    async getProviderId() {
        try {
            const tboId = await this.providerRepository.findOne({
                select: ['provider_id'],
                where: { code: 'TBO' },
            });
            if (!tboId) {
                throw new common_1.InternalServerErrorException('There is an issue while fetching data from the providers.');
            }
            return tboId?.providerId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('There is an issue while fetching data from the providers.');
        }
    }
};
exports.ConfigurationService = ConfigurationService;
exports.ConfigurationService = ConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_master_entity_1.ProviderMaster)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConfigurationService);
//# sourceMappingURL=configuration.service.js.map