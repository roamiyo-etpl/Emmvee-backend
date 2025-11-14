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
exports.TboOrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const tbo_auth_token_service_1 = require("./tbo-auth-token.service");
const http_utility_1 = require("../../../../shared/utilities/flight/http.utility");
let TboOrderDetailService = class TboOrderDetailService {
    tboAuthTokenService;
    constructor(tboAuthTokenService) {
        this.tboAuthTokenService = tboAuthTokenService;
    }
    async orderDetail(orderRequest, providerCredentials, headers) {
        const { activeProviders, searchReqId, bookingId, bookingLogId, currency, bookingRefId } = orderRequest;
        const getTokenRequest = [];
        getTokenRequest['providerCred'] = JSON.parse(activeProviders[0].providerCredentials);
        getTokenRequest['headers'] = headers;
        try {
            const auth = {
                username: providerCredentials.username,
                password: providerCredentials.password,
            };
            const authToken = await this.tboAuthTokenService.getAuthToken(getTokenRequest);
            console.log(authToken, "token");
            const tboOrderRequest = {
                BookingId: 2032181,
                EndUserIp: headers['ip-address'] || "192.000.000.000",
                TokenId: authToken
            };
            const endPointGetBooking = `${providerCredentials.service_url}/Getbookingdetail`;
            const getBookingDetails = await this.executeQuoteWithRetry(tboOrderRequest, endPointGetBooking, auth);
            return {
                success: true,
                bookDetailsResponse: getBookingDetails.GetBookingDetailResult,
            };
        }
        catch (error) {
            console.error('TBO Book Detail Service Error:', error);
            throw new common_1.InternalServerErrorException('ERR_TBO_Book_Details_FAILED');
        }
    }
    async executeQuoteWithRetry(request, endpoint, auth, maxRetries = 1) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await http_utility_1.Http.httpRequestTBOHotel('POST', endpoint, request, auth);
                console.log(`TBO Room Book (attempt ${attempt}): Success`);
                return response;
            }
            catch (error) {
                console.error(`TBO Room Book attempt ${attempt} failed:`, error.message);
                if (attempt === maxRetries) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
};
exports.TboOrderDetailService = TboOrderDetailService;
exports.TboOrderDetailService = TboOrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbo_auth_token_service_1.TboAuthTokenService])
], TboOrderDetailService);
//# sourceMappingURL=tbo-order-detail.service.js.map