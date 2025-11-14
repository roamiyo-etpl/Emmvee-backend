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
exports.HotelSearchCheckResultsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const hotel_search_initiate_dto_1 = require("./hotel-search-initiate.dto");
const class_transformer_1 = require("class-transformer");
class HotelSearchCheckResultsDto {
    searchReqId;
    searchSetting;
    sort;
}
exports.HotelSearchCheckResultsDto = HotelSearchCheckResultsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This will be the UUID that we receive from the search/initiate',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelSearchCheckResultsDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: hotel_search_initiate_dto_1.SearchSettingDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => hotel_search_initiate_dto_1.SearchSettingDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", hotel_search_initiate_dto_1.SearchSettingDto)
], HotelSearchCheckResultsDto.prototype, "searchSetting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: hotel_search_initiate_dto_1.SortDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => hotel_search_initiate_dto_1.SortDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", hotel_search_initiate_dto_1.SortDto)
], HotelSearchCheckResultsDto.prototype, "sort", void 0);
//# sourceMappingURL=hotel-search-check-results.dto.js.map