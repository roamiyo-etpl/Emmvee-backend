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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const hotel_search_initiate_dto_1 = require("./dtos/hotel-search-initiate.dto");
const hotel_search_check_results_dto_1 = require("./dtos/hotel-search-check-results.dto");
const hotel_search_filtration_dto_1 = require("./dtos/hotel-search-filtration.dto");
const search_service_1 = require("./search.service");
const swagger_1 = require("@nestjs/swagger");
const custom_header_decorator_1 = require("../../../shared/decorators/common/custom-header.decorator");
const standard_api_headers_constant_1 = require("../../../shared/constants/standard-api-headers.constant");
const standard_api_responses_constant_1 = require("../../../shared/constants/standard-api-responses.constant");
let SearchController = class SearchController {
    searchService;
    constructor(searchService) {
        this.searchService = searchService;
    }
    async initiate(hotelSearchInitiateDto, headers) {
        try {
            return await this.searchService.searchInitiate(hotelSearchInitiateDto, headers);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
    async checkResults(hotelSearchCheckResultsDto, headers) {
        try {
            return await this.searchService.searchCheckResults(hotelSearchCheckResultsDto, headers);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
    async filtration(hotelSearchFiltrationDto, headers) {
        try {
            return await this.searchService.searchFiltration(hotelSearchFiltrationDto, headers);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_SUCCESS_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_NOT_FOUND_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_BAD_REQUEST_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_UNPROCESSABLE_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_INTERNAL_SERVER_ERROR_RESPONSE),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('initiate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_search_initiate_dto_1.HotelSearchInitiateDto, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "initiate", null);
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'searchReqId', description: 'Search request ID from initiate endpoint', required: true }),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_SUCCESS_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_NOT_FOUND_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_BAD_REQUEST_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_UNPROCESSABLE_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_INTERNAL_SERVER_ERROR_RESPONSE),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('check-results'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_search_check_results_dto_1.HotelSearchCheckResultsDto, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "checkResults", null);
__decorate([
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_SUCCESS_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_NOT_FOUND_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_BAD_REQUEST_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_UNPROCESSABLE_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_INTERNAL_SERVER_ERROR_RESPONSE),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('filtration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_search_filtration_dto_1.HotelSearchFiltrationDto, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "filtration", null);
exports.SearchController = SearchController = __decorate([
    (0, swagger_1.ApiTags)('Hotel'),
    (0, swagger_1.ApiHeaders)([standard_api_headers_constant_1.SWG_HEADER_CURRENCY_PREFERENCE, standard_api_headers_constant_1.SWG_HEADER_IP_MANDATE, standard_api_headers_constant_1.SWG_HEADER_API_VERSION_MANDATE]),
    (0, custom_header_decorator_1.RequiredHeaders)([standard_api_headers_constant_1.DEC_HEADER_IP_ADDRESS_MANDATE, standard_api_headers_constant_1.DEC_HEADER_API_VERSION_MANDATE, standard_api_headers_constant_1.DEC_HEADER_CURRENCY_PREFERENCE_MANDATE]),
    (0, common_1.Controller)('hotel/search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map