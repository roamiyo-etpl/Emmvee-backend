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
exports.GetCancellationChargesResponseDto = exports.GetCancellationChargesDto = exports.GetCancellationChargesRequestDto = exports.GetChangeRequestStatusResponseDto = exports.GetChangeRequestStatusRequestDto = exports.SendChangeResponseDto = exports.SendChangeRequestDto = exports.ReleasePNRResponseDto = exports.ReleasePNRRequestDto = exports.SectorDto = exports.CancelFlightDto = exports.CancellationStatus = exports.CancellationType = exports.RequestType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
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
var CancellationStatus;
(function (CancellationStatus) {
    CancellationStatus[CancellationStatus["NotSet"] = 0] = "NotSet";
    CancellationStatus[CancellationStatus["Unassigned"] = 1] = "Unassigned";
    CancellationStatus[CancellationStatus["Assigned"] = 2] = "Assigned";
    CancellationStatus[CancellationStatus["Acknowledged"] = 3] = "Acknowledged";
    CancellationStatus[CancellationStatus["Completed"] = 4] = "Completed";
    CancellationStatus[CancellationStatus["Rejected"] = 5] = "Rejected";
    CancellationStatus[CancellationStatus["Closed"] = 6] = "Closed";
    CancellationStatus[CancellationStatus["Pending"] = 7] = "Pending";
    CancellationStatus[CancellationStatus["Other"] = 8] = "Other";
})(CancellationStatus || (exports.CancellationStatus = CancellationStatus = {}));
class CancelFlightDto {
    bookingId;
    requestType;
    remarks;
    cancellationType;
    ticketIds;
    sectors;
    releasePnr;
}
exports.CancelFlightDto = CancelFlightDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique booking ID',
        example: '123456',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CancelFlightDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Request type values',
        example: 'FullCancellation',
        enum: ['FullCancellation', 'PartialCancellation', 'Reissuance', 'NotSet'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CancelFlightDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Remarks for cancellation (provider requires non-empty remarks)',
        example: 'Customer requested cancellation via portal',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CancelFlightDto.prototype, "remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cancellation type values',
        example: 'Others',
        enum: ['NotSet', 'NoShow', 'FlightCancelled', 'Others'],
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CancelFlightDto.prototype, "cancellationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of ticket IDs (for partial cancellation)',
        example: [123456, 123457],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CancelFlightDto.prototype, "ticketIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sectors for partial cancellation',
        type: () => [SectorDto],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SectorDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CancelFlightDto.prototype, "sectors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether to release PNR (for hold bookings only)',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CancelFlightDto.prototype, "releasePnr", void 0);
class SectorDto {
    origin;
    destination;
}
exports.SectorDto = SectorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Origin airport code',
        example: 'DEL',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SectorDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Destination airport code',
        example: 'BOM',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SectorDto.prototype, "destination", void 0);
class ReleasePNRRequestDto {
    EndUserIp;
    TokenId;
    BookingId;
    Source;
}
exports.ReleasePNRRequestDto = ReleasePNRRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End user IP address',
        example: '192.168.10.36',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReleasePNRRequestDto.prototype, "EndUserIp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token ID for authentication',
        example: 'ebf966ff-9e72-4fc2-a63d-2236a91f7152',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReleasePNRRequestDto.prototype, "TokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique Booking ID',
        example: 1288527,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReleasePNRRequestDto.prototype, "BookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Airline source (fetched from GetBookingDetails API)',
        example: '4',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReleasePNRRequestDto.prototype, "Source", void 0);
class ReleasePNRResponseDto {
    TraceId;
    ResponseStatus;
    Error;
}
exports.ReleasePNRResponseDto = ReleasePNRResponseDto;
class SendChangeRequestDto {
    EndUserIp;
    TokenId;
    BookingId;
    RequestType;
    CancellationType;
    TicketId;
    Remarks;
    Sectors;
}
exports.SendChangeRequestDto = SendChangeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End user IP address' }),
    __metadata("design:type", String)
], SendChangeRequestDto.prototype, "EndUserIp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token ID for authentication' }),
    __metadata("design:type", String)
], SendChangeRequestDto.prototype, "TokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique booking ID' }),
    __metadata("design:type", Number)
], SendChangeRequestDto.prototype, "BookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request type: 1=Full, 2=Partial, 3=Reissuance' }),
    __metadata("design:type", Number)
], SendChangeRequestDto.prototype, "RequestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cancellation type: 0=NotSet, 1=NoShow, 2=FlightCancelled, 3=Others' }),
    __metadata("design:type", Number)
], SendChangeRequestDto.prototype, "CancellationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of ticket IDs (comma-separated string or array)' }),
    __metadata("design:type", Object)
], SendChangeRequestDto.prototype, "TicketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Remarks for cancellation' }),
    __metadata("design:type", String)
], SendChangeRequestDto.prototype, "Remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sectors for partial cancellation', required: false }),
    __metadata("design:type", Array)
], SendChangeRequestDto.prototype, "Sectors", void 0);
class SendChangeResponseDto {
    B2B2BStatus;
    TicketCRInfo;
    ResponseStatus;
    TraceId;
    Error;
}
exports.SendChangeResponseDto = SendChangeResponseDto;
class GetChangeRequestStatusRequestDto {
    EndUserIp;
    TokenId;
    ChangeRequestId;
}
exports.GetChangeRequestStatusRequestDto = GetChangeRequestStatusRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End user IP address' }),
    __metadata("design:type", String)
], GetChangeRequestStatusRequestDto.prototype, "EndUserIp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token ID for authentication' }),
    __metadata("design:type", String)
], GetChangeRequestStatusRequestDto.prototype, "TokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Change request ID from SendChangeRequest response' }),
    __metadata("design:type", Number)
], GetChangeRequestStatusRequestDto.prototype, "ChangeRequestId", void 0);
class GetChangeRequestStatusResponseDto {
    ResponseStatus;
    TraceId;
    Error;
    ChangeRequestId;
    RefundedAmount;
    CancellationCharge;
    ServiceTaxOnRAF;
    ChangeRequestStatus;
}
exports.GetChangeRequestStatusResponseDto = GetChangeRequestStatusResponseDto;
class GetCancellationChargesRequestDto {
    EndUserIp;
    TokenId;
    RequestType;
    BookingId;
    BookingMode;
}
exports.GetCancellationChargesRequestDto = GetCancellationChargesRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End user IP address' }),
    __metadata("design:type", String)
], GetCancellationChargesRequestDto.prototype, "EndUserIp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token ID for authentication' }),
    __metadata("design:type", String)
], GetCancellationChargesRequestDto.prototype, "TokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request type (1 for full cancellation)' }),
    __metadata("design:type", Number)
], GetCancellationChargesRequestDto.prototype, "RequestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique booking ID received in Ticket Response' }),
    __metadata("design:type", Number)
], GetCancellationChargesRequestDto.prototype, "BookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Booking mode (5 for API)', required: false }),
    __metadata("design:type", Number)
], GetCancellationChargesRequestDto.prototype, "BookingMode", void 0);
class GetCancellationChargesDto {
    bookingId;
    requestType;
}
exports.GetCancellationChargesDto = GetCancellationChargesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique booking ID',
        example: 123456,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetCancellationChargesDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Request type',
        example: 'FullCancellation',
        enum: ['FullCancellation', 'PartialCancellation', 'Reissuance'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetCancellationChargesDto.prototype, "requestType", void 0);
class GetCancellationChargesResponseDto {
    ResponseStatus;
    TraceId;
    RefundAmount;
    CancellationCharge;
    Remarks;
    Currency;
    Error;
}
exports.GetCancellationChargesResponseDto = GetCancellationChargesResponseDto;
//# sourceMappingURL=cancel.dto.js.map