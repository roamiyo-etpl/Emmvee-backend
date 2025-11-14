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
exports.TboCancellationService = void 0;
const common_1 = require("@nestjs/common");
const tbo_auth_token_service_1 = require("./tbo-auth-token.service");
const http_utility_1 = require("../../../../shared/utilities/flight/http.utility");
const DEFAULT_IP_ADDRESS = "192.000.000.000";
const BOOKING_MODE = 5;
const REQUEST_TYPE = 4;
let TboCancellationService = class TboCancellationService {
    tboAuthTokenService;
    constructor(tboAuthTokenService) {
        this.tboAuthTokenService = tboAuthTokenService;
    }
    async cancelRequest(cancelRequest, providerCredentials, headers) {
        const { activeProviders, searchReqId, supplierBookingId } = cancelRequest;
        const getTokenRequest = [];
        getTokenRequest['providerCred'] = JSON.parse(activeProviders[0].providerCredentials);
        getTokenRequest['headers'] = headers;
        try {
            const auth = {
                username: providerCredentials.username,
                password: providerCredentials.password,
            };
            const authToken = await this.tboAuthTokenService.getAuthToken(getTokenRequest);
            const tboSendChangeRequestBody = {
                BookingMode: BOOKING_MODE,
                RequestType: REQUEST_TYPE,
                Remarks: "cancel hotel",
                BookingId: 2032181,
                EndUserIp: headers['ip-address'] || DEFAULT_IP_ADDRESS,
                TokenId: authToken
            };
            const endSendChangeRequest = `${providerCredentials.book_url}/SendChangeRequest`;
            const sendChangeRequestResponse = await this.executeQuoteWithRetry(tboSendChangeRequestBody, endSendChangeRequest, auth);
            let responseResult;
            let isBookingCancelable = false;
            const changeRequestResponse = sendChangeRequestResponse.HotelChangeRequestResult;
            responseResult = changeRequestResponse;
            if (changeRequestResponse.ChangeRequestStatus === 3 && changeRequestResponse.Error.ErrorCode === 0) {
                const tboGetChangeRequestStatusBody = {
                    BookingMode: BOOKING_MODE,
                    ChangeRequestId: changeRequestResponse.ChangeRequestId,
                    EndUserIp: headers['ip-address'] || DEFAULT_IP_ADDRESS,
                    TokenId: authToken
                };
                const endGetChangeRequestStatus = `${providerCredentials.book_url}/GetChangeRequestStatus`;
                const getChangeRequestStatusResponse = await this.executeQuoteWithRetry(tboGetChangeRequestStatusBody, endGetChangeRequestStatus, auth);
                responseResult = getChangeRequestStatusResponse.HotelChangeRequestStatusResult;
                isBookingCancelable = true;
            }
            return {
                success: true,
                isBookingCancelable,
                cancellationResponse: responseResult,
            };
        }
        catch (error) {
            console.error('TBO Book Detail Service Error:', error);
            throw new common_1.InternalServerErrorException('ERR_TBO_Book_Details_FAILED');
        }
    }
    async getAuthToken(providerCredentials, headers) {
        const getTokenRequest = {
            providerCred: providerCredentials,
            headers: headers
        };
        try {
            return await this.tboAuthTokenService.getAuthToken(getTokenRequest);
        }
        catch (error) {
            console.error("Failed to get TBO Auth Token:", error);
            throw new common_1.InternalServerErrorException("Failed to get TBO Auth Token");
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
exports.TboCancellationService = TboCancellationService;
exports.TboCancellationService = TboCancellationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbo_auth_token_service_1.TboAuthTokenService])
], TboCancellationService);
//# sourceMappingURL=tbo-cancellation.service.js.map