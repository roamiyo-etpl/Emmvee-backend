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
exports.HotelDetailResponseDto = exports.HotelGeolocationDto = exports.HotelRatingDto = exports.HotelDetailRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class HotelDetailRequestDto {
    hotelId;
    supplierCode;
}
exports.HotelDetailRequestDto = HotelDetailRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel ID',
        example: '1863197',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelDetailRequestDto.prototype, "hotelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supplier Code',
        example: 'TBO',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelDetailRequestDto.prototype, "supplierCode", void 0);
class HotelRatingDto {
    stars;
    reviewScore;
}
exports.HotelRatingDto = HotelRatingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel star rating',
        example: 4,
    }),
    __metadata("design:type", Number)
], HotelRatingDto.prototype, "stars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Review score',
        example: '8.5',
    }),
    __metadata("design:type", String)
], HotelRatingDto.prototype, "reviewScore", void 0);
class HotelGeolocationDto {
    latitude;
    longitude;
}
exports.HotelGeolocationDto = HotelGeolocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitude',
        example: '40.7580',
    }),
    __metadata("design:type", String)
], HotelGeolocationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitude',
        example: '-73.9855',
    }),
    __metadata("design:type", String)
], HotelGeolocationDto.prototype, "longitude", void 0);
class HotelDetailResponseDto {
    hotelId;
    name;
    address;
    city;
    state;
    country;
    countryCode;
    description;
    rating;
    geolocation;
    images;
    amenities;
    poi;
    neighbourhoods;
}
exports.HotelDetailResponseDto = HotelDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel ID',
        example: '107953',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "hotelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel name',
        example: 'Pierre & Vacances Terrazas Costa del Sol',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel address',
        example: 'Avd Sierra Morena, Urbanización Bahía las Rocas, 2',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City',
        example: 'MANILVA',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State',
        example: 'MALAGA',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country',
        example: 'Spain',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country code',
        example: 'ES',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel description',
        example: 'A luxurious beachfront resort offering stunning ocean views, world-class amenities, and exceptional service in the heart of Costa del Sol.',
    }),
    __metadata("design:type", String)
], HotelDetailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel rating information',
        type: HotelRatingDto,
    }),
    __metadata("design:type", HotelRatingDto)
], HotelDetailResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel geolocation',
        type: HotelGeolocationDto,
    }),
    __metadata("design:type", HotelGeolocationDto)
], HotelDetailResponseDto.prototype, "geolocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel images',
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        type: [String],
    }),
    __metadata("design:type", Array)
], HotelDetailResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel amenities',
        example: ['WiFi', 'Parking', 'Pool'],
        type: [String],
    }),
    __metadata("design:type", Array)
], HotelDetailResponseDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Points of interest',
        example: ['Beach', 'Shopping Center'],
        type: [String],
    }),
    __metadata("design:type", Array)
], HotelDetailResponseDto.prototype, "poi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Neighbourhoods',
        example: ['Downtown', 'Beach Area'],
        type: [String],
    }),
    __metadata("design:type", Array)
], HotelDetailResponseDto.prototype, "neighbourhoods", void 0);
//# sourceMappingURL=hotel-detail.dto.js.map