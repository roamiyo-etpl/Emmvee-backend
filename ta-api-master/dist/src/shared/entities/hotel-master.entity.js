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
exports.HotelMasterEntity = exports.HotelSourceEnum = exports.StarRatingEnum = void 0;
const typeorm_1 = require("typeorm");
var StarRatingEnum;
(function (StarRatingEnum) {
    StarRatingEnum["ONE"] = "1";
    StarRatingEnum["TWO"] = "2";
    StarRatingEnum["THREE"] = "3";
    StarRatingEnum["FOUR"] = "4";
    StarRatingEnum["FIVE"] = "5";
    StarRatingEnum["SIX"] = "6";
    StarRatingEnum["SEVEN"] = "7";
})(StarRatingEnum || (exports.StarRatingEnum = StarRatingEnum = {}));
var HotelSourceEnum;
(function (HotelSourceEnum) {
    HotelSourceEnum["DMC"] = "dmc";
    HotelSourceEnum["EXTRANET"] = "extranet";
    HotelSourceEnum["TBO"] = "tbo";
    HotelSourceEnum["HOTELBEDS"] = "hotelbeds";
})(HotelSourceEnum || (exports.HotelSourceEnum = HotelSourceEnum = {}));
const HotelSourceEnumValue = Object.keys(HotelSourceEnum)
    .filter((key) => isNaN(Number(HotelSourceEnum[key])))
    .map((key) => `${key} = ${HotelSourceEnum[key]}`)
    .join(', ');
const StarRatingEnumValue = Object.keys(StarRatingEnum)
    .filter((key) => isNaN(Number(StarRatingEnum[key])))
    .map((key) => `${key} = ${StarRatingEnum[key]}`)
    .join(', ');
let HotelMasterEntity = class HotelMasterEntity {
    hotelMasterId;
    hotelName;
    highlightText;
    starRating;
    countryCode;
    city;
    state;
    address;
    address1 = null;
    postalCode;
    latitude;
    longitude;
    heroImage;
    hotelSource;
    hotelCode;
    providerCode;
    isActive;
    isDeleted;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.HotelMasterEntity = HotelMasterEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'hotel_master_id' }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "hotelMasterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "hotelName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'highlight_text', type: 'text', nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "highlightText", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'star_rating', type: 'enum', enum: StarRatingEnum, nullable: true, comment: StarRatingEnumValue }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "starRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', type: 'varchar', length: 5, nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_1', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], HotelMasterEntity.prototype, "address1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latitude', type: 'double precision', nullable: true }),
    __metadata("design:type", Number)
], HotelMasterEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'longitude', type: 'double precision', nullable: true }),
    __metadata("design:type", Number)
], HotelMasterEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hero_image', type: 'text', nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "heroImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_source', type: 'enum', enum: HotelSourceEnum, nullable: false, comment: HotelSourceEnumValue }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "hotelSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_code', type: 'varchar', length: 50, nullable: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "hotelCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], HotelMasterEntity.prototype, "providerCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], HotelMasterEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], HotelMasterEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', type: 'timestamptz', nullable: false }),
    __metadata("design:type", Date)
], HotelMasterEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], HotelMasterEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], HotelMasterEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], HotelMasterEntity.prototype, "updatedBy", void 0);
exports.HotelMasterEntity = HotelMasterEntity = __decorate([
    (0, typeorm_1.Entity)('hotel_master'),
    (0, typeorm_1.Unique)(['hotelCode'])
], HotelMasterEntity);
//# sourceMappingURL=hotel-master.entity.js.map