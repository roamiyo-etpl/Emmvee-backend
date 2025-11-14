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
exports.OrderDetailDto = exports.SearchAirLegs = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class SearchAirLegs {
    origin;
    destination;
    departureDate;
}
exports.SearchAirLegs = SearchAirLegs;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SearchAirLegs.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SearchAirLegs.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SearchAirLegs.prototype, "departureDate", void 0);
class BookingDetails {
    orderStatus;
    pnr;
    orderNo;
    firstName;
    lastName;
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BookingDetails.prototype, "orderStatus", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDetails.prototype, "pnr", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDetails.prototype, "orderNo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDetails.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDetails.prototype, "lastName", void 0);
class OrderDetailDto {
    providerCode;
    bookingDetails;
    searchReqId;
    searchAirLegs;
    mode;
}
exports.OrderDetailDto = OrderDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider code',
        example: 'PK',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "providerCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'bookingDetails will be here.',
        example: [
            {
                orderStatus: 1,
                pnr: 'abcdf',
                orderNo: '12345',
                firstName: 'test',
                lastName: 'user',
            },
        ],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BookingDetails),
    __metadata("design:type", Array)
], OrderDetailDto.prototype, "bookingDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search request ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search air legs information',
        type: [SearchAirLegs],
        example: [
            {
                origin: 'NYC',
                destination: 'LAX',
            },
            {
                origin: 'LAX',
                destination: 'NYC',
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SearchAirLegs),
    __metadata("design:type", Array)
], OrderDetailDto.prototype, "searchAirLegs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider mode',
        example: 'Test',
        enum: ['Production', 'Test', 'Sandbox'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "mode", void 0);
//# sourceMappingURL=order-detail.dto.js.map