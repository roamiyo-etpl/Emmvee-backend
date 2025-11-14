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
exports.HotelRoomListRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const hotel_search_initiate_dto_1 = require("../../search/dtos/hotel-search-initiate.dto");
class HotelRoomListRequestDto {
    hotelId;
    searchReqId;
    supplierCode;
    checkIn;
    checkOut;
    rooms;
    searchMetadata;
}
exports.HotelRoomListRequestDto = HotelRoomListRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel ID',
        example: '1863197',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelRoomListRequestDto.prototype, "hotelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'searchReqId received in search result.',
        example: '93e44d92-8236-48c3-acd8-04d43f477a02',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HotelRoomListRequestDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supplier code',
        example: 'TBO',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelRoomListRequestDto.prototype, "supplierCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Check-in date (YYYY-MM-DD)',
        example: '2026-05-15',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], HotelRoomListRequestDto.prototype, "checkIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Check-out date (YYYY-MM-DD)',
        example: '2026-05-16',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], HotelRoomListRequestDto.prototype, "checkOut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Room configuration { adults: 2, children: 1, childAges: [8] },',
        type: [hotel_search_initiate_dto_1.RoomDto],
        example: [
            { adults: 1, children: 0, childAges: [] }
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => hotel_search_initiate_dto_1.RoomDto),
    __metadata("design:type", Array)
], HotelRoomListRequestDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: hotel_search_initiate_dto_1.SearchMetaDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => hotel_search_initiate_dto_1.SearchMetaDataDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", hotel_search_initiate_dto_1.SearchMetaDataDto)
], HotelRoomListRequestDto.prototype, "searchMetadata", void 0);
//# sourceMappingURL=hotel-room-list.dto.js.map