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
exports.TboHotelRoomContentEntity = void 0;
const typeorm_1 = require("typeorm");
let TboHotelRoomContentEntity = class TboHotelRoomContentEntity {
    id;
    hotelCode;
    supplierCode;
    roomCode;
    isParentRoom;
    minPax;
    maxPax;
    maxAdults;
    maxChildren;
    minAdults;
    description;
    typeCode;
    typeDescription;
    characteristicCode;
    characteristicDescription;
    roomFacilities;
    roomStays;
    pmsRoomCode;
    createdAt;
    updatedAt;
};
exports.TboHotelRoomContentEntity = TboHotelRoomContentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "hotelCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "supplierCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "roomCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_parent_room', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], TboHotelRoomContentEntity.prototype, "isParentRoom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_pax', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelRoomContentEntity.prototype, "minPax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_pax', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelRoomContentEntity.prototype, "maxPax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_adults', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelRoomContentEntity.prototype, "maxAdults", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_children', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelRoomContentEntity.prototype, "maxChildren", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_adults', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelRoomContentEntity.prototype, "minAdults", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_code', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "typeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_description', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "typeDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'characteristic_code', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "characteristicCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'characteristic_description', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "characteristicDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_facilities', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], TboHotelRoomContentEntity.prototype, "roomFacilities", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_stays', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], TboHotelRoomContentEntity.prototype, "roomStays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pms_room_code', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TboHotelRoomContentEntity.prototype, "pmsRoomCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TboHotelRoomContentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TboHotelRoomContentEntity.prototype, "updatedAt", void 0);
exports.TboHotelRoomContentEntity = TboHotelRoomContentEntity = __decorate([
    (0, typeorm_1.Entity)('tbo_hotel_room_content'),
    (0, typeorm_1.Index)(['hotelCode', 'supplierCode']),
    (0, typeorm_1.Index)(['hotelCode', 'roomCode']),
    (0, typeorm_1.Index)(['roomCode', 'typeCode'])
], TboHotelRoomContentEntity);
//# sourceMappingURL=tbo-hotel-room-content.entity.js.map