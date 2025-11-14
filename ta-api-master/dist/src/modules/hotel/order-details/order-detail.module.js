"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelOrderDetailModule = void 0;
const common_1 = require("@nestjs/common");
const providers_module_1 = require("../providers/providers.module");
const order_detail_service_1 = require("./order-detail.service");
const order_detail_controller_1 = require("./order-detail.controller");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
const typeorm_1 = require("@nestjs/typeorm");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
let HotelOrderDetailModule = class HotelOrderDetailModule {
};
exports.HotelOrderDetailModule = HotelOrderDetailModule;
exports.HotelOrderDetailModule = HotelOrderDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [providers_module_1.ProvidersModule, typeorm_1.TypeOrmModule.forFeature([provider_master_entity_1.ProviderMaster])],
        providers: [order_detail_service_1.HotelOrderDetailService, supplier_cred_service_1.SupplierCredService],
        controllers: [order_detail_controller_1.HotelOrderDetailController],
        exports: [order_detail_service_1.HotelOrderDetailService],
    })
], HotelOrderDetailModule);
//# sourceMappingURL=order-detail.module.js.map