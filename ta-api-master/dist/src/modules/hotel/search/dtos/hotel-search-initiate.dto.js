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
exports.HotelSearchInitiateDto = exports.SortDto = exports.SearchSettingDto = exports.SearchMetaDataDto = exports.SearchCriteriaDto = exports.LocationDto = exports.GeoLocationDto = exports.RoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const hotel_enum_1 = require("../../../../shared/enums/hotel/hotel.enum");
class RoomDto {
    adults;
    children;
    childAges;
}
exports.RoomDto = RoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of adults',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RoomDto.prototype, "adults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of children',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RoomDto.prototype, "children", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.children > 0),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'children age as Array of number',
        example: [2, 4],
    }),
    __metadata("design:type", Array)
], RoomDto.prototype, "childAges", void 0);
class GeoLocationDto {
    latitude;
    longitude;
}
exports.GeoLocationDto = GeoLocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitude of location',
        example: 28.560985,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GeoLocationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitude of location',
        example: 77.269694,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GeoLocationDto.prototype, "longitude", void 0);
class LocationDto {
    geoLocation;
    placeId;
    searchKeyword;
    country;
    city;
    radius;
    radiusUnit;
    hotelId;
}
exports.LocationDto = LocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: GeoLocationDto }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GeoLocationDto),
    __metadata("design:type", GeoLocationDto)
], LocationDto.prototype, "geoLocation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Google Place Id',
        example: 'q3s5s82s5353',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LocationDto.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search Keyword',
        example: 'MG Road, Bangalore',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "searchKeyword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country Code',
        example: 'IN',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enter City',
        example: 'Delhi',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Radius in km or mil',
        example: 5,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], LocationDto.prototype, "radius", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Radius unit',
        example: 'km',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.RadiusUnit),
    __metadata("design:type", String)
], LocationDto.prototype, "radiusUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hotel ID',
        example: 1863197,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LocationDto.prototype, "hotelId", void 0);
class SearchCriteriaDto {
    checkIn;
    checkOut;
    rooms;
    location;
}
exports.SearchCriteriaDto = SearchCriteriaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Check In Date',
        example: '2026-05-15',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SearchCriteriaDto.prototype, "checkIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Check Out Date',
        example: '2026-05-16',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SearchCriteriaDto.prototype, "checkOut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [RoomDto],
        description: 'Room details - can be a single room object or array of rooms adults: 1, children: 1, childAges: [2, 4]',
        example: [{ adults: 1, children: 0, childAges: [] }],
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RoomDto),
    __metadata("design:type", Object)
], SearchCriteriaDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LocationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LocationDto),
    __metadata("design:type", LocationDto)
], SearchCriteriaDto.prototype, "location", void 0);
class SearchMetaDataDto {
    guestNationality;
    searchType;
    market;
    channel = hotel_enum_1.Channel.WEB;
}
exports.SearchMetaDataDto = SearchMetaDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enter Guest Nationality',
        example: 'IN',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SearchMetaDataDto.prototype, "guestNationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enter Search Type',
        example: 'hotel',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.HotelSearchType),
    __metadata("design:type", String)
], SearchMetaDataDto.prototype, "searchType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking Market',
        example: 'IN',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchMetaDataDto.prototype, "market", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enter channel name',
        example: 'web',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.Channel),
    __metadata("design:type", String)
], SearchMetaDataDto.prototype, "channel", void 0);
class SearchSettingDto {
    apiEnvironment;
    refundableOnly;
    pageLimit;
}
exports.SearchSettingDto = SearchSettingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Environment Name',
        example: 'test',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.ApiEnvironment),
    __metadata("design:type", String)
], SearchSettingDto.prototype, "apiEnvironment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'check is refundable true or false',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchSettingDto.prototype, "refundableOnly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pagelimit Number of records required per page.',
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchSettingDto.prototype, "pageLimit", void 0);
class SortDto {
    by;
    order = hotel_enum_1.SortOrder.ASC;
}
exports.SortDto = SortDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel Search By',
        example: 'price',
        enum: hotel_enum_1.HotelSearchBy,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.HotelSearchBy),
    __metadata("design:type", String)
], SortDto.prototype, "by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel Sorted By',
        example: 'asc',
        enum: hotel_enum_1.SortOrder,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(hotel_enum_1.SortOrder),
    __metadata("design:type", String)
], SortDto.prototype, "order", void 0);
class HotelSearchInitiateDto {
    searchCriteria;
    searchMetadata;
    searchSetting;
    sort;
}
exports.HotelSearchInitiateDto = HotelSearchInitiateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: SearchCriteriaDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SearchCriteriaDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", SearchCriteriaDto)
], HotelSearchInitiateDto.prototype, "searchCriteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SearchMetaDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SearchMetaDataDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", SearchMetaDataDto)
], HotelSearchInitiateDto.prototype, "searchMetadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SearchSettingDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SearchSettingDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", SearchSettingDto)
], HotelSearchInitiateDto.prototype, "searchSetting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SortDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SortDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", SortDto)
], HotelSearchInitiateDto.prototype, "sort", void 0);
//# sourceMappingURL=hotel-search-initiate.dto.js.map