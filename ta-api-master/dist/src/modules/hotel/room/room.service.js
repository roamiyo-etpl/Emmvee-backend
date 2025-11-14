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
var HotelRoomService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomService = void 0;
const common_1 = require("@nestjs/common");
const providers_rooms_service_1 = require("../providers/providers-rooms.service");
const supplier_cred_service_1 = require("../../generic/supplier-credientials/supplier-cred.service");
let HotelRoomService = HotelRoomService_1 = class HotelRoomService {
    providerRoomsService;
    supplierCred;
    logger = new common_1.Logger(HotelRoomService_1.name);
    constructor(providerRoomsService, supplierCred) {
        this.providerRoomsService = providerRoomsService;
        this.supplierCred = supplierCred;
    }
    async getHotelRoomList(apiReqData, headers) {
        try {
            if (!apiReqData.rooms.some((room) => room.adults >= 1)) {
                throw new common_1.BadRequestException('ERR_ADULT_SHOULD_BE_ONE');
            }
            const providersData = await this.supplierCred.getActiveProviders(headers);
            const activeProviders = providersData.map((data) => ({
                providerId: data.provider_id,
                code: data.code,
                assignedId: data.provider_id,
                providerCredentials: data.provider_credentials,
            }));
            Object.assign(apiReqData, { activeProviders: activeProviders });
            return await this.providerRoomsService.searchRoom(apiReqData, headers);
        }
        catch (error) {
            this.logger.error('Hotel Room List failed:', error);
            throw new Error(`Hotel Room List failed: ${error.message}`);
        }
    }
    async getHotelRoomQuote(hotelRoomQuoteDto, headers) {
        try {
            if (!hotelRoomQuoteDto.roomBookingInfo[0].rateKey) {
                throw new common_1.BadRequestException("RateKey can't be null");
            }
            const providersData = await this.supplierCred.getActiveProviders(headers);
            const activeProviders = providersData.map((data) => ({
                providerId: data.provider_id,
                code: data.code,
                assignedId: data.provider_id,
                providerCredentials: data.provider_credentials,
            }));
            Object.assign(hotelRoomQuoteDto, { activeProviders: activeProviders });
            return await this.providerRoomsService.searchRoomQuote(hotelRoomQuoteDto, headers);
        }
        catch (error) {
            this.logger.error('Hotel Room Quote failed:', error);
            throw new Error(`Hotel Room Quote failed: ${error.message}`);
        }
    }
};
exports.HotelRoomService = HotelRoomService;
exports.HotelRoomService = HotelRoomService = HotelRoomService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [providers_rooms_service_1.ProviderRoomsService,
        supplier_cred_service_1.SupplierCredService])
], HotelRoomService);
//# sourceMappingURL=room.service.js.map