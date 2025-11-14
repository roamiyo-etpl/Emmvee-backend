"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const currency_controller_1 = require("./currency/currency.controller");
const currency_service_1 = require("./currency/currency.service");
const currency_repository_1 = require("./currency/currency.repository");
const typeorm_1 = require("@nestjs/typeorm");
const currency_rate_entity_1 = require("../../shared/entities/currency-rate.entity");
const provider_master_entity_1 = require("../../shared/entities/provider-master.entity");
const common_scheduler_1 = require("../../shared/schedulers/common/common.scheduler");
const supplier_cred_service_1 = require("./supplier-credientials/supplier-cred.service");
let GenericModule = class GenericModule {
};
exports.GenericModule = GenericModule;
exports.GenericModule = GenericModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([currency_rate_entity_1.CurrencyConversionEntity, provider_master_entity_1.ProviderMaster]), schedule_1.ScheduleModule.forRoot()],
        controllers: [currency_controller_1.CurrencyController],
        providers: [currency_service_1.CurrencyService, currency_repository_1.CurrencyRepository, common_scheduler_1.CommonScheduler, supplier_cred_service_1.SupplierCredService],
        exports: [currency_service_1.CurrencyService, supplier_cred_service_1.SupplierCredService],
    })
], GenericModule);
//# sourceMappingURL=generic.module.js.map