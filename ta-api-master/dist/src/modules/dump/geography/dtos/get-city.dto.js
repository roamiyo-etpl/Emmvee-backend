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
exports.GetCityDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class GetCityDto {
    stateCode;
    countryCode;
    cityName;
}
exports.GetCityDto = GetCityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State Code',
        example: 'BDS',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'State code is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d-]{1,5}$/, { message: 'State code must be a valid state code' }),
    __metadata("design:type", String)
], GetCityDto.prototype, "stateCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country Code',
        example: 'IN, US, etc.',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Country code is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z]{2}$/, { message: 'Country code must be a valid country code' }),
    __metadata("design:type", String)
], GetCityDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'City Name',
        example: 'Mumbai',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'City name is required' }),
    (0, class_validator_1.MinLength)(3, { message: 'City name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'City name must be at most 50 characters long' }),
    __metadata("design:type", String)
], GetCityDto.prototype, "cityName", void 0);
//# sourceMappingURL=get-city.dto.js.map