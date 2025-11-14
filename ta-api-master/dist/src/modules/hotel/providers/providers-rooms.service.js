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
exports.ProviderRoomsService = void 0;
const common_1 = require("@nestjs/common");
const tbo_room_service_1 = require("./tbo/tbo-room.service");
let ProviderRoomsService = class ProviderRoomsService {
    tboRoomService;
    constructor(tboRoomService) {
        this.tboRoomService = tboRoomService;
    }
    async searchRoom(roomReq, headers) {
        const { activeProviders } = roomReq;
        const roomRequest = [];
        roomRequest['searchReqId'] = roomReq['searchReqId'];
        try {
            const roomResults = [];
            const activeProvidersName = activeProviders.map((data) => {
                const cred = JSON.parse(data.providerCredentials);
                return cred.provider;
            });
            const language = headers['language']?.toUpperCase() || 'en';
            Object.assign(roomReq, { currency: headers['currency-preference']?.toUpperCase() || 'USD' });
            Object.assign(roomReq, { language: language });
            roomRequest['language'] = language;
            roomRequest['roomReq'] = roomReq;
            if (activeProvidersName.indexOf('TBO') !== -1) {
                const tboCred = activeProviders.filter((item) => {
                    const cred = JSON.parse(item.providerCredentials);
                    return cred.provider == 'TBO';
                });
                if (tboCred.length > 0) {
                    roomRequest['providerCred'] = tboCred[0]?.providerCredentials;
                    const tboRoomResult = this.tboRoomService.searchRooms(roomReq, JSON.parse(tboCred[0]?.providerCredentials));
                    roomResults.push(tboRoomResult);
                }
            }
            if (activeProvidersName.indexOf('HOB') !== -1) {
                const hobCred = activeProviders.filter((item) => {
                    return item.code == 'HOB';
                });
                if (hobCred.length > 0) {
                    roomRequest['assignedId'] = hobCred[0]?.assignedId;
                    roomRequest['providerCred'] = hobCred[0]?.providerCredentials;
                }
            }
            let result;
            try {
                if (roomResults.length === 0) {
                    throw new common_1.InternalServerErrorException('ERR_NO_ACTIVE_PROVIDERS');
                }
                result = await Promise.race(roomResults);
            }
            catch (error) {
                console.log('supplier room details error', error);
                throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
            }
            const results = result;
            return results;
        }
        catch (error) {
            console.log('supplier room details error', error);
            throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
        }
    }
    async searchRoomQuote(roomQuoteReq, headers) {
        const { activeProviders } = roomQuoteReq;
        const roomQuoteRequest = [];
        roomQuoteRequest['searchReqId'] = roomQuoteReq['searchReqId'];
        try {
            const roomQuoteResults = [];
            const activeProvidersName = activeProviders.map((data) => {
                const cred = JSON.parse(data.providerCredentials);
                return cred.provider;
            });
            const language = headers['language']?.toUpperCase() || 'en';
            Object.assign(roomQuoteReq, { currency: headers['currency-preference']?.toUpperCase() || 'USD' });
            Object.assign(roomQuoteReq, { language: language });
            roomQuoteRequest['language'] = language;
            roomQuoteRequest['roomQuoteReq'] = roomQuoteReq;
            if (activeProvidersName.indexOf('TBO') !== -1) {
                console.log('TBO found for room quote');
                const tboCred = activeProviders.filter((item) => {
                    const cred = JSON.parse(item.providerCredentials);
                    return cred.provider == 'TBO';
                });
                if (tboCred.length > 0) {
                    roomQuoteRequest['assignedId'] = tboCred[0]?.assignedId;
                    roomQuoteRequest['providerCred'] = tboCred[0]?.providerCredentials;
                    const tboRoomQuoteResult = this.tboRoomService.searchRoomQuote(roomQuoteReq, JSON.parse(tboCred[0]?.providerCredentials));
                    roomQuoteResults.push(tboRoomQuoteResult);
                }
            }
            if (activeProvidersName.indexOf('HOB') !== -1) {
                const hobCred = activeProviders.filter((item) => {
                    return item.code == 'HOB';
                });
                if (hobCred.length > 0) {
                    roomQuoteRequest['assignedId'] = hobCred[0]?.assignedId;
                    roomQuoteRequest['providerCred'] = hobCred[0]?.providerCredentials;
                }
            }
            let result;
            try {
                if (roomQuoteResults.length === 0) {
                    throw new common_1.InternalServerErrorException('ERR_NO_ACTIVE_PROVIDERS');
                }
                result = await Promise.race(roomQuoteResults);
            }
            catch (error) {
                console.log('supplier room quote error', error);
                throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
            }
            const results = result;
            return results;
        }
        catch (error) {
            console.log('supplier room quote error', error);
            throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
        }
    }
};
exports.ProviderRoomsService = ProviderRoomsService;
exports.ProviderRoomsService = ProviderRoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbo_room_service_1.TboRoomService])
], ProviderRoomsService);
//# sourceMappingURL=providers-rooms.service.js.map