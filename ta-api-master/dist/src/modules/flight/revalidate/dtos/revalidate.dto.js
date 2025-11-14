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
exports.RevalidateDto = exports.GroupHash = exports.PaxesInfo = exports.RouteDetails = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class RouteDetails {
    airline;
    departureCode;
    departureDate;
    departureTime;
    arrivalCode;
    arrivalDate;
    arrivalTime;
    flightNum;
    bookingCode;
}
exports.RouteDetails = RouteDetails;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Airline code',
        example: 'AA',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "airline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure airport code',
        example: 'LGA',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "departureCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure date',
        example: '2026-06-15',
        format: 'date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "departureDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure time',
        example: '09:29 AM',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "departureTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Arrival airport code',
        example: 'ORD',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "arrivalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Arrival date',
        example: '2026-06-15',
        format: 'date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "arrivalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Arrival time',
        example: '11:10 AM',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "arrivalTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flight number',
        example: '3234',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "flightNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking class code',
        example: 'Q',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "bookingCode", void 0);
class PaxesInfo {
    adult;
    children;
    infant;
}
exports.PaxesInfo = PaxesInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of adult passengers',
        example: 2,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaxesInfo.prototype, "adult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of child passengers',
        example: 1,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaxesInfo.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of infant passengers',
        example: 0,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaxesInfo.prototype, "infant", void 0);
class GroupHash {
    provider;
    netAmount;
    solutionId;
}
exports.GroupHash = GroupHash;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider code',
        example: 'PK',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GroupHash.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Net amount for this group',
        example: 450.0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GroupHash.prototype, "netAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Solution ID',
        example: 'SOL123456',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GroupHash.prototype, "solutionId", void 0);
class RevalidateDto {
    solutionId;
    searchReqId;
    trackingId;
    providerCode;
    airTripType;
    cabinClass;
    isMultiReValid;
    groupHash;
    paxes;
    routes;
}
exports.RevalidateDto = RevalidateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Solution ID to revalidate',
        example: 'r5TawedGI+0dM3carFbMJrd0HGyLKfhDxLXg4GJedq2AV9JFLKQegvdbLSnClFO2Mkx7b5JAgrZdSWMarjX8lKqrnAqDCV5a3yMWYjrHknjx5zPImWcAfD9DI81sDgJjMTuz1HJ1yvECFaWGfmsXHlX4+D4kOpqO4H4yB8c2ZFKa/7JlNub+07SJ44LWbWqYeuf0k3Qz7od788m53mnZtynA4x3fcDOVMYrmn7QlH6fVwEW0HZM+htwivXaVQSoRYAP0yLTjH3DaCifTS4ZTvCSw8mmeMBN2DKEYlMwaKNRAdvuIe3x/lSMX4CYWOMRkaDNbsm5eFPiLphWK10SQUqBK+AIX8C6PfKifMNutFKaw/bmDid1/Sgxz+jTYDvFCnKg/aQpnz8vUXoCQVSynQw==',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevalidateDto.prototype, "solutionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search request ID',
        example: 'efc080e1-3989-427d-abd4-edc7c04d27ab',
        format: 'uuid',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevalidateDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'trackingId received in search result.',
        example: 'bdd3ff73-5ee7-49fc-bafa-34ba0666bfb7',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RevalidateDto.prototype, "trackingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider code',
        example: 'PK',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevalidateDto.prototype, "providerCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of air trip',
        example: 'OneWay',
        enum: ['OneWay', 'RoundTrip', 'MultiCity'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevalidateDto.prototype, "airTripType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cabin class',
        example: 'Economy',
        enum: ['Economy', 'Business', 'First'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevalidateDto.prototype, "cabinClass", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether this is a multi-revalidation request',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RevalidateDto.prototype, "isMultiReValid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Group hash information',
        type: [GroupHash],
        example: [
            {
                provider: 'PK',
                netAmount: 370.7,
                solutionId: 'r5TawedGI+0dM3carFbMJrd0HGyLKfhDxLXg4GJedq2AV9JFLKQegvdbLSnClFO2Mkx7b5JAgrZdSWMarjX8lKqrnAqDCV5a3yMWYjrHknjx5zPImWcAfD9DI81sDgJjMTuz1HJ1yvECFaWGfmsXHlX4+D4kOpqO4H4yB8c2ZFKa/7JlNub+07SJ44LWbWqYeuf0k3Qz7od788m53mnZtynA4x3fcDOVMYrmn7QlH6fVwEW0HZM+htwivXaVQSoRYAP0yLTjH3DaCifTS4ZTvCSw8mmeMBN2DKEYlMwaKNRAdvuIe3x/lSMX4CYWOMRkaDNbsm5eFPiLphWK10SQUqBK+AIX8C6PfKifMNutFKaw/bmDid1/Sgxz+jTYDvFCnKg/aQpnz8vUXoCQVSynQw==',
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GroupHash),
    __metadata("design:type", Array)
], RevalidateDto.prototype, "groupHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger information',
        type: [PaxesInfo],
        example: [
            {
                adult: 2,
                children: 0,
                infant: 0,
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PaxesInfo),
    __metadata("design:type", Array)
], RevalidateDto.prototype, "paxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Route information - array of flight segments for each leg of the journey',
        type: [RouteDetails],
        isArray: true,
        example: [
            [
                {
                    airline: 'AA',
                    departureCode: 'LGA',
                    departureDate: '2026-06-15',
                    departureTime: '09:29 AM',
                    arrivalCode: 'ORD',
                    arrivalDate: '2026-06-15',
                    arrivalTime: '11:10 AM',
                    flightNum: '3234',
                    bookingCode: 'Q',
                },
                {
                    airline: 'AA',
                    departureCode: 'ORD',
                    departureDate: '2026-06-15',
                    departureTime: '02:14 PM',
                    arrivalCode: 'LAX',
                    arrivalDate: '2026-06-15',
                    arrivalTime: '04:52 PM',
                    flightNum: '1204',
                    bookingCode: 'Q',
                },
            ],
        ],
    }),
    (0, class_validator_1.IsArray)({ each: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RouteDetails),
    __metadata("design:type", Array)
], RevalidateDto.prototype, "routes", void 0);
//# sourceMappingURL=revalidate.dto.js.map