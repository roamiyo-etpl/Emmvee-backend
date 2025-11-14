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
exports.TboBookService = void 0;
const common_1 = require("@nestjs/common");
const http_utility_1 = require("../../../../shared/utilities/flight/http.utility");
const tbo_auth_token_service_1 = require("./tbo-auth-token.service");
let TboBookService = class TboBookService {
    tboAuthTokenService;
    constructor(tboAuthTokenService) {
        this.tboAuthTokenService = tboAuthTokenService;
    }
    async bookConfirmation(bookRequest, providerCredentials, headers) {
        const { roomQuoteResponse, originalBookRequest, activeProviders, searchReqId, bookingId, bookingLogId, currency } = bookRequest;
        const getTokenRequest = [];
        getTokenRequest['providerCred'] = JSON.parse(activeProviders[0].providerCredentials);
        getTokenRequest['headers'] = headers;
        try {
            const authToken = await this.tboAuthTokenService.getAuthToken(getTokenRequest);
            const hotelPassengers = this.creatingBookRequest(originalBookRequest.passengers);
            const prices = this.parsePriceHash(roomQuoteResponse.prices.priceHash);
            const auth = {
                username: providerCredentials.username,
                password: providerCredentials.password,
            };
            const endpoint = `${providerCredentials.book_url}/book`;
            const tboBookRequest = {
                BookingCode: roomQuoteResponse.rateKey,
                IsVoucherBooking: true,
                GuestNationality: "IN",
                EndUserIp: headers['ip-address'] || "192.168.9.119",
                RequestedBookingMode: 5,
                NetAmount: prices.price,
                ClientReferenceId: roomQuoteResponse.searchReqId,
                HotelRoomsDetails: hotelPassengers,
            };
            const response = await this.executeQuoteWithRetry(tboBookRequest, endpoint, auth);
            if (response.BookResult.Error.ErrorCode === 0) {
                const tboOrderRequest = {
                    BookingId: response.BookResult.BookingId,
                    EndUserIp: headers['ip-address'] || "192.000.000.000",
                    TokenId: authToken
                };
                console.log(tboOrderRequest, "orderRequest");
                const endPointGetBooking = `${providerCredentials.service_url}/Getbookingdetail`;
                const responseBookingDetails = await this.executeQuoteWithRetry(tboOrderRequest, endPointGetBooking, auth);
                return {
                    success: true,
                    errorCode: response.BookResult.Error.ErrorCode,
                    message: response.BookResult.HotelBookingStatus,
                    supplierRequest: tboBookRequest,
                    supplierResponse: response.BookResult,
                    supplierOrderDetails: responseBookingDetails.GetBookingDetailResult,
                };
            }
            else {
                return {
                    success: false,
                    errorCode: response.BookResult.Error.ErrorCode,
                    message: response.BookResult.Error.ErrorMessage,
                    supplierRequest: tboBookRequest,
                    supplierResponse: '',
                    supplierOrderDetails: '',
                };
            }
        }
        catch (error) {
            console.error('TBO Room Book Service Error:', error);
            throw new common_1.InternalServerErrorException('ERR_TBO_ROOM_Book_FAILED');
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
    creatingBookRequest(passengers) {
        const rooms = {};
        passengers.forEach(pax => {
            if (!rooms[pax.roomId]) {
                rooms[pax.roomId] = [];
            }
            rooms[pax.roomId].push(pax);
        });
        let globalPAN = null;
        for (const pax of passengers) {
            if (pax.type?.toLowerCase() === "adult" && pax.pan) {
                globalPAN = pax.pan;
                break;
            }
        }
        let globalEmail = null;
        for (const pax of passengers) {
            if (pax.type?.toLowerCase() === "adult" && pax.email) {
                globalEmail = pax.email;
                break;
            }
        }
        let globalPhoneno = null;
        for (const pax of passengers) {
            if (pax.type?.toLowerCase() === "adult" && pax.mobileNo && pax.dialCode) {
                globalPhoneno = `${pax.dialCode}${pax.mobileNo}`;
                break;
            }
        }
        const HotelRoomsDetails = Object.keys(rooms).map(roomId => {
            const roomPassengers = rooms[roomId];
            let leadAssigned = false;
            let sharedEmail = null;
            let sharedPan = null;
            let sharedPhoneno = null;
            for (const pax of roomPassengers) {
                if (pax.type?.toLowerCase() === "adult" && pax.email) {
                    sharedEmail = pax.email;
                    break;
                }
            }
            for (const pax of roomPassengers) {
                if (pax.type?.toLowerCase() === "adult" && pax.dialCode && pax.mobileNo) {
                    sharedPhoneno = `${pax.dialCode}${pax.mobileNo}`;
                    break;
                }
            }
            for (const pax of roomPassengers) {
                if (pax.type?.toLowerCase() === "adult" && pax.pan) {
                    sharedPan = pax.pan;
                    break;
                }
            }
            if (!sharedEmail && globalEmail) {
                sharedEmail = globalEmail;
            }
            if (!sharedPan && globalPAN) {
                sharedPan = globalPAN;
            }
            if (!sharedPhoneno && globalPhoneno) {
                sharedPhoneno = globalPhoneno;
            }
            const HotelPassenger = rooms[roomId].map(pax => {
                const isAdult = pax.type?.toLowerCase() === "adult";
                const passengerData = {
                    Title: pax.title,
                    FirstName: pax.firstName,
                    MiddleName: pax.middleName || "",
                    LastName: pax.lastName,
                    Email: isAdult
                        ? (sharedEmail || pax.email || null)
                        : null,
                    PaxType: isAdult ? 1 : 2,
                    LeadPassenger: false,
                    Age: pax.age || 0,
                    PassportNo: pax.passport || null,
                    PassportIssueDate: pax.passportIssueDate || null,
                    PassportExpDate: pax.passportExpDate || null,
                    Phoneno: isAdult ? (pax.phone || sharedPhoneno) : null,
                    PaxId: 0,
                    GSTCompanyAddress: null,
                    GSTCompanyContactNumber: null,
                    GSTCompanyName: null,
                    GSTNumber: null,
                    GSTCompanyEmail: null,
                    PAN: pax.pan || sharedPan || null,
                };
                if (isAdult && !leadAssigned) {
                    passengerData.LeadPassenger = true;
                    leadAssigned = true;
                }
                return passengerData;
            });
            return { HotelPassenger };
        });
        return HotelRoomsDetails;
    }
    parsePriceHash(inputStr) {
        let splitStr = inputStr.split('_');
        return {
            supplierCode: splitStr[0],
            hotelCode: splitStr[1],
            price: parseFloat(splitStr[2]),
            tax: parseFloat(splitStr[3]),
            searchReqId: splitStr[4]
        };
    }
};
exports.TboBookService = TboBookService;
exports.TboBookService = TboBookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbo_auth_token_service_1.TboAuthTokenService])
], TboBookService);
//# sourceMappingURL=tbo-book.service.js.map