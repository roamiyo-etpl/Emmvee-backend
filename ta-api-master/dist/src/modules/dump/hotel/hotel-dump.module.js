"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelDumpModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const hotel_dump_service_1 = require("./hotel-dump.service");
const hotel_dump_controller_1 = require("./hotel-dump.controller");
const amenity_master_entity_1 = require("./entities/amenity-master.entity");
const amenity_mapping_entity_1 = require("./entities/amenity-mapping.entity");
const board_code_master_entity_1 = require("./entities/board-code-master.entity");
const board_code_mapping_entity_1 = require("./entities/board-code-mapping.entity");
const country_entity_1 = require("../../../shared/entities/country.entity");
const city_entity_1 = require("../../../shared/entities/city.entity");
const hotel_master_entity_1 = require("../../../shared/entities/hotel-master.entity");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
const tbo_hotel_room_content_entity_1 = require("./entities/tbo-hotel-room-content.entity");
const tbo_hotel_content_entity_1 = require("./entities/tbo-hotel-content.entity");
const tbo_hotel_images_entity_1 = require("./entities/tbo-hotel-images.entity");
const tbo_hotel_additional_details_entity_1 = require("./entities/tbo-hotel-additional-details.entity");
let HotelDumpModule = class HotelDumpModule {
};
exports.HotelDumpModule = HotelDumpModule;
exports.HotelDumpModule = HotelDumpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([
                amenity_master_entity_1.AmenityMasterEntity,
                amenity_mapping_entity_1.AmenityMappingEntity,
                board_code_master_entity_1.BoardCodeMasterEntity,
                board_code_mapping_entity_1.BoardCodeMappingEntity,
                tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity,
                tbo_hotel_images_entity_1.TboHotelImagesEntity,
                tbo_hotel_content_entity_1.TboHotelContentEntity,
                tbo_hotel_room_content_entity_1.TboHotelRoomContentEntity,
                country_entity_1.CountryEntity,
                city_entity_1.CityEntity,
                hotel_master_entity_1.HotelMasterEntity,
                provider_master_entity_1.ProviderMaster,
            ]),
        ],
        providers: [hotel_dump_service_1.HotelDumpService, supplier_cred_service_1.SupplierCredService],
        controllers: [hotel_dump_controller_1.HotelDumpController],
        exports: [hotel_dump_service_1.HotelDumpService],
    })
], HotelDumpModule);
//# sourceMappingURL=hotel-dump.module.js.map