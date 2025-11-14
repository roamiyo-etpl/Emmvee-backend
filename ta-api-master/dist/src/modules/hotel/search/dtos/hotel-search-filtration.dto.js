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
exports.HotelSearchFiltrationDto = exports.FiltersDto = exports.PaginationDto = void 0;
const class_validator_1 = require("class-validator");
const hotel_enum_1 = require("../../../../shared/enums/hotel/hotel.enum");
const hotel_search_initiate_dto_1 = require("./hotel-search-initiate.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PaginationDto {
    page;
    limit;
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Limit ,Total Number of records per page',
        example: 20,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
class FiltersDto {
    priceRange;
    starRating;
    amenities;
    mealTypes;
    neighborhoods;
    poi;
    cancellation;
    hotelNames;
}
exports.FiltersDto = FiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price range Min and Max (can be array of numbers or array of bucket labels)',
        example: [50, 200],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FiltersDto.prototype, "priceRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of star rating',
        example: [2, 4, 5],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "starRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of amenities',
        example: ['Parking', 'Free WiFi'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meal Type Array of string',
        example: ['Room_Only', 'BreakFast'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "mealTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nearborhood location',
        example: ['Kalkaji Mandir', 'Indira Gandhi International Airport (DEL)'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "neighborhoods", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Point of interest',
        example: ['Kalkaji Mandir', 'Indira Gandhi International Airport (DEL)'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "poi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cancellation policy',
        example: ['refundable', 'non-refundable'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "cancellation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel Name',
        example: '["The Suryaa New Delhi", "Moustache Delhi"]',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FiltersDto.prototype, "hotelNames", void 0);
class HotelSearchFiltrationDto {
    searchReqId;
    apiEnvironment;
    sort;
    pagination;
    filters;
}
exports.HotelSearchFiltrationDto = HotelSearchFiltrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will be the UUID that we receive from the search/initiate',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], HotelSearchFiltrationDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Environment name',
        example: 'test',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.ApiEnvironment),
    __metadata("design:type", String)
], HotelSearchFiltrationDto.prototype, "apiEnvironment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: hotel_search_initiate_dto_1.SortDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => hotel_search_initiate_dto_1.SortDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", hotel_search_initiate_dto_1.SortDto)
], HotelSearchFiltrationDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PaginationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PaginationDto),
    __metadata("design:type", PaginationDto)
], HotelSearchFiltrationDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FiltersDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FiltersDto),
    __metadata("design:type", FiltersDto)
], HotelSearchFiltrationDto.prototype, "filters", void 0);
//# sourceMappingURL=hotel-search-filtration.dto.js.map