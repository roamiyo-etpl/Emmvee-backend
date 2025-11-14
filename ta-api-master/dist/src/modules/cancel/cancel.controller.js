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
exports.GenericCancelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cancel_service_1 = require("./cancel.service");
const cancel_dto_1 = require("./dto/cancel.dto");
const custom_header_decorator_1 = require("../../shared/decorators/common/custom-header.decorator");
const header_validation_guard_1 = require("../../shared/guards/common/header.validation.guard");
const standard_api_responses_constant_1 = require("../../shared/constants/standard-api-responses.constant");
const standard_api_headers_constant_1 = require("../../shared/constants/standard-api-headers.constant");
let GenericCancelController = class GenericCancelController {
    cancelService;
    constructor(cancelService) {
        this.cancelService = cancelService;
    }
    async cancel(dto, headers) {
        if (!dto?.mode) {
            throw new common_1.BadRequestException('mode is required ("flight" | "hotel")');
        }
        return this.cancelService.cancel({ cancelReq: dto, headers });
    }
    async getCancellationCharges(dto, headers) {
        if (!dto?.mode) {
            throw new common_1.BadRequestException('mode is required ("flight" | "hotel")');
        }
        return this.cancelService.getCancellationCharges({ cancelReq: dto, headers });
    }
};
exports.GenericCancelController = GenericCancelController;
__decorate([
    (0, common_1.Post)('cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Generic cancel API (flight/hotel)' }),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_SUCCESS_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_NOT_FOUND_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_BAD_REQUEST_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_UNPROCESSABLE_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_INTERNAL_SERVER_ERROR_RESPONSE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancel_dto_1.GenericCancelDto, Object]),
    __metadata("design:returntype", Promise)
], GenericCancelController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)('cancellation-charges'),
    (0, swagger_1.ApiOperation)({ summary: 'Generic cancellation charges (flight/hotel)' }),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_SUCCESS_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_NOT_FOUND_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_BAD_REQUEST_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_UNPROCESSABLE_RESPONSE),
    (0, swagger_1.ApiResponse)(standard_api_responses_constant_1.SWG_INTERNAL_SERVER_ERROR_RESPONSE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancel_dto_1.GenericGetCancellationChargesDto, Object]),
    __metadata("design:returntype", Promise)
], GenericCancelController.prototype, "getCancellationCharges", null);
exports.GenericCancelController = GenericCancelController = __decorate([
    (0, swagger_1.ApiTags)('Cancel'),
    (0, common_1.UseGuards)(header_validation_guard_1.HeaderValidationGuard),
    (0, swagger_1.ApiHeaders)([
        standard_api_headers_constant_1.SWG_HEADER_CURRENCY_PREFERENCE,
        standard_api_headers_constant_1.SWG_HEADER_LANGUAGE_PREFERENCE_MANDATE,
        standard_api_headers_constant_1.SWG_HEADER_IP_MANDATE,
        standard_api_headers_constant_1.SWG_HEADER_API_VERSION_MANDATE,
        standard_api_headers_constant_1.SWG_HEADER_CLUB_ID_MANDATE,
        standard_api_headers_constant_1.SWG_HEADER_DEVICE_INFORMATION_MANDATE,
    ]),
    (0, custom_header_decorator_1.RequiredHeaders)([
        standard_api_headers_constant_1.DEC_HEADER_LANGUAGE_PREFERENCE_MANDATE,
        standard_api_headers_constant_1.DEC_HEADER_API_VERSION_MANDATE,
        standard_api_headers_constant_1.DEC_HEADER_CURRENCY_PREFERENCE_MANDATE,
        standard_api_headers_constant_1.DEC_HEADER_DEVICE_INFORMATION_MANDATE,
        standard_api_headers_constant_1.DEC_HEADER_CLUB_ID_MANDATE,
        standard_api_headers_constant_1.DEC_HEADER_IP_ADDRESS_MANDATE,
    ]),
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [cancel_service_1.GenericCancelService])
], GenericCancelController);
//# sourceMappingURL=cancel.controller.js.map