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
exports.TboHotelContentEntity = void 0;
const typeorm_1 = require("typeorm");
let TboHotelContentEntity = class TboHotelContentEntity {
    id;
    hotelCode;
    hotelName;
    rating;
    latitude;
    longitude;
    address;
    city;
    state;
    country;
    cityCode;
    stateCode;
    countryCode;
    pincode;
    heroImage;
    hotelVector = null;
    hotelNameNormalized = null;
};
exports.TboHotelContentEntity = TboHotelContentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], TboHotelContentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_code', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "hotelCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hotel_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "hotelName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TboHotelContentEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latitude', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'longitude', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "cityCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "stateCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pincode', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hero_image', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], TboHotelContentEntity.prototype, "heroImage", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_hotel_vector', { synchronize: false }),
    (0, typeorm_1.Column)({ name: 'hotel_vector', type: 'tsvector', nullable: true }),
    __metadata("design:type", Object)
], TboHotelContentEntity.prototype, "hotelVector", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_hotel_name_normalized', { synchronize: false }),
    (0, typeorm_1.Column)({ name: 'hotel_name_normalized', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], TboHotelContentEntity.prototype, "hotelNameNormalized", void 0);
exports.TboHotelContentEntity = TboHotelContentEntity = __decorate([
    (0, typeorm_1.Entity)('tbo_hotel_content'),
    (0, typeorm_1.Index)(['hotelCode']),
    (0, typeorm_1.Index)(['city', 'state', 'country']),
    (0, typeorm_1.Index)(['rating'])
], TboHotelContentEntity);
//# sourceMappingURL=tbo-hotel-content.entity.js.map