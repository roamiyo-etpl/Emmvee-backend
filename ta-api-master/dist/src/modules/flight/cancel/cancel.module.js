"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cancel_service_1 = require("./cancel.service");
const cancel_repository_1 = require("./cancel.repository");
const provider_module_1 = require("../providers/provider.module");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
const cancellations_entity_1 = require("../../../shared/entities/cancellations.entity");
let CancelModule = class CancelModule {
};
exports.CancelModule = CancelModule;
exports.CancelModule = CancelModule = __decorate([
    (0, common_1.Module)({
        imports: [provider_module_1.ProviderModule, config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([cancel_repository_1.CancelRepository, bookings_entity_1.Booking, cancellations_entity_1.Cancellation])],
        providers: [cancel_service_1.CancelService, cancel_repository_1.CancelRepository],
        controllers: [],
        exports: [cancel_service_1.CancelService],
    })
], CancelModule);
//# sourceMappingURL=cancel.module.js.map