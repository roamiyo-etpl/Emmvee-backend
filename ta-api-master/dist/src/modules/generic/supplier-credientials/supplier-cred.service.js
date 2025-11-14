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
exports.SupplierCredService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
let SupplierCredService = class SupplierCredService {
    assignedProviderRepo;
    constructor(assignedProviderRepo) {
        this.assignedProviderRepo = assignedProviderRepo;
    }
    async getActiveProviders(headers) {
        try {
            let activeProviders;
            if (headers.providerCode && headers.providerCode !== '') {
                activeProviders = await this.assignedProviderRepo.find({
                    where: { is_active: 'Active', code: headers.providerCode, module_type: headers.moduleType || 'Hotel' },
                });
            }
            else {
                activeProviders = await this.assignedProviderRepo.find({
                    where: { is_active: 'Active', module_type: headers.moduleType || 'Hotel' },
                });
            }
            if (!activeProviders || activeProviders.length == 0) {
                throw new common_1.NotFoundException('ERR_NO_ACTIVE_SUPPLIER_FOUND');
            }
            return activeProviders;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getInActiveProviders(clubId) {
        try {
            const activeProviders = await this.assignedProviderRepo.find({
                where: { is_active: 'Inactive', module_type: 'Hotel' },
            });
            return activeProviders;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getProviderConfiguration(supplierCode, mode = '') {
        if (supplierCode != '') {
            if (mode == '') {
                return await this.assignedProviderRepo.findOne({
                    where: {
                        code: supplierCode,
                        is_active: 'Active',
                        module_type: 'Hotel',
                    },
                });
            }
            return await this.assignedProviderRepo.findOne({
                where: {
                    code: supplierCode,
                    provider_mode: mode.charAt(0).toUpperCase() + mode.slice(1),
                    module_type: 'Hotel',
                },
            });
        }
        return null;
    }
};
exports.SupplierCredService = SupplierCredService;
exports.SupplierCredService = SupplierCredService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_master_entity_1.ProviderMaster)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SupplierCredService);
//# sourceMappingURL=supplier-cred.service.js.map