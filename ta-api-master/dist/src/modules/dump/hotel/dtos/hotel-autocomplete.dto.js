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
exports.HotelAutocompleteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
class HotelAutocompleteDto {
    query;
    lat;
    long;
}
exports.HotelAutocompleteDto = HotelAutocompleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search Query',
        example: 'Cairo, Egypt, India, Mumbai, etc.',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.MinLength)(3, { message: 'Query must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Query must be at most 255 characters long' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HotelAutocompleteDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User Latitude',
        example: '19.076',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            throw new common_1.BadRequestException('Latitude must be a between -90 and 90');
        }
        return val;
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsLatitude)({ message: 'Latitude must be between -90 and 90' }),
    __metadata("design:type", Number)
], HotelAutocompleteDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User Longitude',
        example: '72.8777',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            throw new common_1.BadRequestException('Longitude must be a between -180 and 180');
        }
        return val;
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsLongitude)({ message: 'Longitude must be between -180 and 180' }),
    __metadata("design:type", Number)
], HotelAutocompleteDto.prototype, "long", void 0);
//# sourceMappingURL=hotel-autocomplete.dto.js.map