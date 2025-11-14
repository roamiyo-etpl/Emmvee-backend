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
exports.TboHotelImagesEntity = void 0;
const typeorm_1 = require("typeorm");
const tbo_hotel_additional_details_entity_1 = require("./tbo-hotel-additional-details.entity");
let TboHotelImagesEntity = class TboHotelImagesEntity {
    id;
    hotelCode;
    supplierCode;
    typeCode;
    typeName;
    roomCode;
    roomType;
    url;
    order;
    visualOrder;
    createdAt;
    updatedAt;
    hotel;
};
exports.TboHotelImagesEntity = TboHotelImagesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "hotelCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "supplierCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "typeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_name', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "typeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_code', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "roomCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_type', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "roomType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url', type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], TboHotelImagesEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelImagesEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'visual_order', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelImagesEntity.prototype, "visualOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TboHotelImagesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TboHotelImagesEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity, (hotel) => hotel.images),
    (0, typeorm_1.JoinColumn)({ name: 'hotel_code', referencedColumnName: 'hotelCode' }),
    __metadata("design:type", tbo_hotel_additional_details_entity_1.TboHotelAdditionalDetailsEntity)
], TboHotelImagesEntity.prototype, "hotel", void 0);
exports.TboHotelImagesEntity = TboHotelImagesEntity = __decorate([
    (0, typeorm_1.Entity)('tbo_hotel_images'),
    (0, typeorm_1.Index)(['hotelCode', 'supplierCode']),
    (0, typeorm_1.Index)(['hotelCode', 'typeCode']),
    (0, typeorm_1.Index)(['hotelCode', 'order', 'visualOrder'])
], TboHotelImagesEntity);
//# sourceMappingURL=tbo-hotel-images.entity.js.map