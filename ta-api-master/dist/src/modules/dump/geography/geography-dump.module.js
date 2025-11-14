"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyDumpModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const geography_dump_service_1 = require("./geography-dump.service");
const geography_dump_controller_1 = require("./geography-dump.controller");
const geography_repository_1 = require("./geography.repository");
const city_entity_1 = require("../../../shared/entities/city.entity");
const state_entity_1 = require("../../../shared/entities/state.entity");
const country_entity_1 = require("../../../shared/entities/country.entity");
let GeographyDumpModule = class GeographyDumpModule {
};
exports.GeographyDumpModule = GeographyDumpModule;
exports.GeographyDumpModule = GeographyDumpModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([city_entity_1.CityEntity, state_entity_1.StateEntity, country_entity_1.CountryEntity])],
        providers: [geography_dump_service_1.GeographyDumpService, geography_repository_1.GeographyRepository],
        controllers: [geography_dump_controller_1.GeographyDumpController],
        exports: [geography_dump_service_1.GeographyDumpService],
    })
], GeographyDumpModule);
//# sourceMappingURL=geography-dump.module.js.map