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
var HotelOrderDetailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelOrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const provider_order_detail_service_1 = require("../providers/provider-order-detail.service");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
let HotelOrderDetailService = HotelOrderDetailService_1 = class HotelOrderDetailService {
    providerOrderDetailService;
    supplierCred;
    logger = new common_1.Logger(HotelOrderDetailService_1.name);
    constructor(providerOrderDetailService, supplierCred) {
        this.providerOrderDetailService = providerOrderDetailService;
        this.supplierCred = supplierCred;
    }
    async getOrderDetails(orderReq, headers) {
        try {
            const providersData = await this.supplierCred.getActiveProviders(headers);
            const activeProviders = providersData.map((data) => ({
                providerId: data.provider_id,
                code: data.code,
                assignedId: data.provider_id,
                providerCredentials: data.provider_credentials,
            }));
            Object.assign(orderReq, { activeProviders: activeProviders });
            const response = await this.providerOrderDetailService.orderDetail(orderReq, headers);
            const getBookingResponse = this.convertBookingResponse(response.bookDetailsResponse);
            return {
                success: true,
                ...getBookingResponse
            };
        }
        catch (error) {
            this.logger.error('Hotel Order Detail failed:', error);
            throw new Error(`Hotel Order Detail failed: ${error.message}`);
        }
    }
    convertBookingResponse(apiResponse) {
        const booking = {
            bookingId: apiResponse.BookingId,
            bookingReferenceId: apiResponse.BookingRefNo,
            supplierBookingId: apiResponse.BookingId,
            status: apiResponse.HotelBookingStatus || "Unknown",
            remarks: apiResponse.AgentRemarks || "",
            bookingDate: apiResponse.BookingDate,
            hotel: {
                hotelId: apiResponse.TBOHotelCode || "",
                name: apiResponse.HotelName,
                rating: apiResponse.StarRating,
                address: `${apiResponse.AddressLine1 || ""} ${apiResponse.AddressLine2 || ""}`.trim(),
                phones: [],
                location: {
                    geoLocation: {
                        latitude: apiResponse.Latitude,
                        longitude: apiResponse.Longitude,
                    },
                    city: apiResponse.City,
                    state: apiResponse.State || '',
                    country: apiResponse.country || '',
                    countryCode: apiResponse.CountryCode,
                },
                description: apiResponse.description,
                images: apiResponse.images || []
            },
            stayDetails: {
                checkIn: apiResponse.CheckInDate,
                checkOut: apiResponse.CheckOutDate,
                noOfRooms: apiResponse.NoOfRooms,
                nights: this.calculateNights(apiResponse.CheckInDate, apiResponse.CheckOutDate),
            },
            prices: {
                selling: generic_utility_1.Generic.currencyConversion(apiResponse.NetAmount, 'INR', 'INR') || 0,
                currency: 'INR',
                taxIncluded: true,
                taxes: generic_utility_1.Generic.currencyConversion(apiResponse.NetTax, 'INR', 'INR') || 0,
                priceHash: `TBO_${apiResponse.TBOHotelCode}_${apiResponse.NetAmount}_${apiResponse.NetTax}_hjahjd6363`,
            },
            rooms: [],
            termsCancellationPolicy: apiResponse.Rooms[0].CancellationPolicy || null,
        };
        if (apiResponse.Rooms && Array.isArray(apiResponse.Rooms)) {
            apiResponse.Rooms.forEach(room => {
                const roomObj = {
                    roomName: room.RoomTypeName,
                    roomDescription: room.RoomDescription,
                    adultCount: room.AdultCount,
                    childCount: room.ChildCount || 0,
                    childAges: room.ChildAge || [],
                    inclusion: room.Inclusion || "",
                    cancellationPolicy: room.CancelPolicies || []
                };
                booking.rooms.push(roomObj);
            });
        }
        return booking;
    }
    calculateNights(checkIn, checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = checkOutDate.getTime() - checkInDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
};
exports.HotelOrderDetailService = HotelOrderDetailService;
exports.HotelOrderDetailService = HotelOrderDetailService = HotelOrderDetailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_order_detail_service_1.ProviderOrderDetailService,
        supplier_cred_service_1.SupplierCredService])
], HotelOrderDetailService);
//# sourceMappingURL=order-detail.service.js.map