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
exports.HotelRoomQuoteDto = exports.RoomBookingInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RoomBookingInfoDto {
    rateKey;
    rooms;
    adults;
    children;
    childAges;
}
exports.RoomBookingInfoDto = RoomBookingInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'unique identifier for the rate, used for booking.',
        example: '1863197!TB!1!TB!496ded91-ba3c-11f0-8195-4a620032403f!TB!N!TB!AFF!',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoomBookingInfoDto.prototype, "rateKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'number of rooms.',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RoomBookingInfoDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'number of adults.',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RoomBookingInfoDto.prototype, "adults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'number of children.',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RoomBookingInfoDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ages of children as an array of numbers.',
        example: [3],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RoomBookingInfoDto.prototype, "childAges", void 0);
class HotelRoomQuoteDto {
    hotelId;
    searchReqId;
    supplierCode;
    roomBookingInfo;
}
exports.HotelRoomQuoteDto = HotelRoomQuoteDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'hotelId received in search result.',
        example: '1863197',
    }),
    __metadata("design:type", String)
], HotelRoomQuoteDto.prototype, "hotelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'searchReqId received in room list.',
        example: '93e44d92-8236-48c3-acd8-04d43f477a02',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HotelRoomQuoteDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'providerCode for which this quote needs to be checked.',
        example: 'TBO',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HotelRoomQuoteDto.prototype, "supplierCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Room booking information.',
        type: [RoomBookingInfoDto],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RoomBookingInfoDto),
    __metadata("design:type", Array)
], HotelRoomQuoteDto.prototype, "roomBookingInfo", void 0);
//# sourceMappingURL=hotel-room-quote.dto.js.map