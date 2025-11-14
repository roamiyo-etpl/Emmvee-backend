"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelBookModule = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const book_controller_1 = require("./book.controller");
const providers_module_1 = require("../providers/providers.module");
const room_module_1 = require("../room/room.module");
const book_repository_1 = require("./book.repository");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
const typeorm_1 = require("@nestjs/typeorm");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
let HotelBookModule = class HotelBookModule {
};
exports.HotelBookModule = HotelBookModule;
exports.HotelBookModule = HotelBookModule = __decorate([
    (0, common_1.Module)({
        imports: [providers_module_1.ProvidersModule, room_module_1.RoomModule, typeorm_1.TypeOrmModule.forFeature([provider_master_entity_1.ProviderMaster])],
        providers: [book_service_1.HotelBookService, book_repository_1.BookRepository, supplier_cred_service_1.SupplierCredService],
        controllers: [book_controller_1.HotelBookController],
    })
], HotelBookModule);
//# sourceMappingURL=book.module.js.map