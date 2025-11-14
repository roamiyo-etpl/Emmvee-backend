"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const providers_search_service_1 = require("./providers-search.service");
const providers_rooms_service_1 = require("./providers-rooms.service");
const hotelbeds_search_service_1 = require("./hotelbeds/hotelbeds-search.service");
const tbo_search_service_1 = require("./tbo/tbo-search.service");
const tbo_room_service_1 = require("./tbo/tbo-room.service");
const tbo_repository_1 = require("./tbo/tbo.repository");
const hotel_master_entity_1 = require("../../../shared/entities/hotel-master.entity");
const tbo_hotel_additional_details_entity_1 = require("../../dump/hotel/entities/tbo-hotel-additional-details.entity");
const tbo_hotel_images_entity_1 = require("../../dump/hotel/entities/tbo-hotel-images.entity");
const provider_book_service_1 = require("./provider-book.service");
const tbo_book_service_1 = require("./tbo/tbo-book.service");
const tbo_auth_token_service_1 = require("./tbo/tbo-auth-token.service");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
const configuration_module_1 = require("../configuration/configuration.module");
const provider_order_detail_service_1 = require("./provider-order-detail.service");
const tbo_order_detail_service_1 = require("./tbo/tbo-order-detail.service");
const tbo_cancellation_service_1 = require("./tbo/tbo-cancellation.service");
let ProvidersModule = class ProvidersModule {
};
exports.ProvidersModule = ProvidersModule;
exports.ProvidersModule = ProvidersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([provider_master_entity_1.ProviderMaster, hotel_master_entity_1.HotelMasterEntity, tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity, tbo_hotel_images_entity_1.TboHotelImagesEntity]), configuration_module_1.ConfigurationModule],
        providers: [providers_search_service_1.ProvidersSearchService, providers_rooms_service_1.ProviderRoomsService, provider_book_service_1.ProviderBookService, provider_order_detail_service_1.ProviderOrderDetailService, hotelbeds_search_service_1.HotelbedsSearchService, tbo_search_service_1.TboSearchService, tbo_room_service_1.TboRoomService, tbo_book_service_1.TboBookService, tbo_cancellation_service_1.TboCancellationService, tbo_order_detail_service_1.TboOrderDetailService, tbo_auth_token_service_1.TboAuthTokenService, tbo_repository_1.TboRepository],
        exports: [providers_search_service_1.ProvidersSearchService, providers_rooms_service_1.ProviderRoomsService, provider_book_service_1.ProviderBookService, provider_order_detail_service_1.ProviderOrderDetailService, tbo_auth_token_service_1.TboAuthTokenService],
    })
], ProvidersModule);
//# sourceMappingURL=providers.module.js.map