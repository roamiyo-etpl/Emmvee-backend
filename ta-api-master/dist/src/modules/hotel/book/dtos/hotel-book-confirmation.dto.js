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
exports.HotelBookConfirmationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class HotelBookConfirmationDto {
    bookingRefId;
    searchReqId;
    paymentLogId;
}
exports.HotelBookConfirmationDto = HotelBookConfirmationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference booking ID',
        example: 'TA-2343246',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookConfirmationDto.prototype, "bookingRefId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search Request ID',
        example: '1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookConfirmationDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment log ID',
        example: 'test-1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookConfirmationDto.prototype, "paymentLogId", void 0);
//# sourceMappingURL=hotel-book-confirmation.dto.js.map