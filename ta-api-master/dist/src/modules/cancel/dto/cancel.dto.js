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
exports.GenericGetCancellationChargesDto = exports.GenericCancelDto = exports.SupplierParamsDto = exports.SectorDto = exports.CancellationType = exports.RequestType = exports.CancelMode = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CancelMode;
(function (CancelMode) {
    CancelMode["Flight"] = "flight";
    CancelMode["Hotel"] = "hotel";
})(CancelMode || (exports.CancelMode = CancelMode = {}));
var RequestType;
(function (RequestType) {
    RequestType[RequestType["FullCancellation"] = 1] = "FullCancellation";
    RequestType[RequestType["PartialCancellation"] = 2] = "PartialCancellation";
    RequestType[RequestType["Reissuance"] = 3] = "Reissuance";
})(RequestType || (exports.RequestType = RequestType = {}));
var CancellationType;
(function (CancellationType) {
    CancellationType[CancellationType["NotSet"] = 0] = "NotSet";
    CancellationType[CancellationType["NoShow"] = 1] = "NoShow";
    CancellationType[CancellationType["FlightCancelled"] = 2] = "FlightCancelled";
    CancellationType[CancellationType["Others"] = 3] = "Others";
})(CancellationType || (exports.CancellationType = CancellationType = {}));
class SectorDto {
    origin;
    destination;
}
exports.SectorDto = SectorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Origin airport code', example: 'DEL' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SectorDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Destination airport code', example: 'BOM' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SectorDto.prototype, "destination", void 0);
class SupplierParamsDto {
    remarks;
    cancellationType;
    ticketIds;
    sectors;
    releasePnr;
    providerCode;
}
exports.SupplierParamsDto = SupplierParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Remarks for cancellation', example: 'Customer requested cancellation via portal', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SupplierParamsDto.prototype, "remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cancellation type', example: 'Others', enum: ['NotSet', 'NoShow', 'FlightCancelled', 'Others'], required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SupplierParamsDto.prototype, "cancellationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of ticket IDs (for partial cancellation)', example: [123456, 123457], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SupplierParamsDto.prototype, "ticketIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sectors for partial cancellation', type: () => [SectorDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SectorDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SupplierParamsDto.prototype, "sectors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether to release PNR (for hold bookings only)', example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SupplierParamsDto.prototype, "releasePnr", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SupplierParamsDto.prototype, "providerCode", void 0);
class GenericCancelDto {
    mode;
    bookingId;
    requestType;
    supplierParams;
}
exports.GenericCancelDto = GenericCancelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cancellation mode', enum: CancelMode, example: CancelMode.Flight }),
    (0, class_validator_1.IsEnum)(CancelMode),
    __metadata("design:type", String)
], GenericCancelDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique booking ID', example: 123456 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GenericCancelDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request type', example: 'FullCancellation', enum: ['FullCancellation', 'PartialCancellation', 'Reissuance', 'NotSet'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenericCancelDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supplier-specific parameters (varies by provider)', required: false, type: () => SupplierParamsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SupplierParamsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SupplierParamsDto)
], GenericCancelDto.prototype, "supplierParams", void 0);
class GenericGetCancellationChargesDto {
    mode;
    bookingId;
    requestType;
}
exports.GenericGetCancellationChargesDto = GenericGetCancellationChargesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cancellation mode', enum: CancelMode, example: CancelMode.Flight }),
    (0, class_validator_1.IsEnum)(CancelMode),
    __metadata("design:type", String)
], GenericGetCancellationChargesDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique booking ID', example: 123456 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GenericGetCancellationChargesDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request type', example: 'FullCancellation', enum: ['FullCancellation', 'PartialCancellation', 'Reissuance'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenericGetCancellationChargesDto.prototype, "requestType", void 0);
//# sourceMappingURL=cancel.dto.js.map