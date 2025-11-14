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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingUtility = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const cacheable_1 = require("cacheable");
let CachingUtility = class CachingUtility {
    client;
    constructor(client) {
        this.client = client;
    }
    async getCachedData(searchRequest, providersName, type = null) {
        let redisData;
        try {
            let hashKey = this.createHotelKey(searchRequest, providersName);
            redisData = await this.client.get(hashKey);
            if (!redisData) {
                return { data: [], isSearchNeeded: true };
            }
            const redisJSON = JSON.parse(redisData);
            if (!redisJSON) {
                return { data: [], isSearchNeeded: true };
            }
            const fiveMinutesAgo = (0, moment_1.default)().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const hourAgo = (0, moment_1.default)().subtract(120, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const redisObj = {
                providerName: providersName,
                status: 'IN_PROGRESS',
                timestamp: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                response: redisJSON.response,
            };
            if ((0, moment_1.default)(redisJSON.timestamp, 'YYYY-MM-DD HH:mm:ss') > (0, moment_1.default)(fiveMinutesAgo)) {
                return { data: redisJSON.response, isSearchNeeded: false };
            }
            else if ((0, moment_1.default)(redisJSON.timestamp, 'YYYY-MM-DD HH:mm:ss') > (0, moment_1.default)(hourAgo)) {
                await this.client.set(hashKey, JSON.stringify(redisObj));
                return { data: redisJSON.response, isSearchNeeded: true };
            }
            else {
                await this.client.set(hashKey, JSON.stringify(redisObj));
                return { data: [], isSearchNeeded: true };
            }
        }
        catch (error) {
            return { data: [], isSearchNeeded: true, errorMsg: error, errorData: redisData };
        }
    }
    async getPollingData(hashKey) {
        let redisData;
        try {
            redisData = await this.client.get(hashKey);
            if (!redisData) {
                return { data: [] };
            }
            const redisJSON = JSON.parse(redisData);
            if (redisJSON) {
                return { data: redisJSON };
            }
            return { data: [] };
        }
        catch (error) {
            return { data: [], errorMsg: error, errorData: redisData };
        }
    }
    async setCachedData(requestData, providersName, data, type) {
        try {
            let hashKey = '';
            if (type == 'search') {
                hashKey = this.createHotelKey(requestData, providersName);
            }
            else if (type == 'revalidate') {
                hashKey = this.createHotelRevalidateKey(data, providersName);
            }
            else {
                return { success: false, errorMsg: 'No redis type set in the request.', errorData: data };
            }
            const redisObj = {
                requestData: requestData,
                providerName: providersName,
                status: 'COMPLETE',
                timestamp: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                response: data,
            };
            const valueToStore = JSON.stringify(redisObj);
            await this.client.set(hashKey, valueToStore);
            return { success: true, hashKey: hashKey };
        }
        catch (error) {
            return { success: false, errorMsg: error, errorData: data };
        }
    }
    createHotelKey(searchReq, providersName) {
        const { rooms, checkIn, checkOut, location } = searchReq.searchCriteria;
        const adults = rooms.reduce((acc, room) => acc + room.adults, 0);
        const children = rooms.reduce((acc, room) => acc + room.children, 0);
        const searchType = searchReq?.searchMetadata?.searchType;
        let hashKey = `HOTEL_LIST__${searchType}__DATES-${checkIn}_${checkOut}__PAX-${adults}_${children}__ROOM-${rooms.length || 0}`;
        if (searchType == 'city') {
            hashKey += `__LAT-LNG-${location.geoLocation.latitude}_${location.geoLocation.longitude}`;
        }
        hashKey += `__PROV-${providersName}`;
        return hashKey;
    }
    createHotelRevalidateKey(providerRes, providersName) {
        return `REVALIDATE__REQID-${providerRes.searchReqId}__SOLID-${providerRes?.data?.bookingCode}__PROV-${providersName}`;
    }
    async setCachedDataBySearchReqId(searchReqId, searchResponse) {
        try {
            const hashKey = `SEARCH_REQ_ID-${searchReqId}`;
            const redisObj = {
                searchReqId: searchReqId,
                status: 'COMPLETE',
                timestamp: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                response: JSON.stringify(searchResponse),
            };
            const valueToStore = JSON.stringify(redisObj);
            await this.client.set(hashKey, valueToStore);
            await this.client.expire(hashKey, 3600);
            return { success: true, hashKey: hashKey };
        }
        catch (error) {
            return { success: false, errorMsg: error };
        }
    }
    async getCachedDataBySearchReqId(searchReqId) {
        try {
            const hashKey = `SEARCH_REQ_ID-${searchReqId}`;
            const redisData = await this.client.get(hashKey);
            if (!redisData) {
                return { data: [], isSearchNeeded: true, errorMsg: 'No cached data found for searchReqId' };
            }
            const redisJSON = JSON.parse(redisData);
            if (!redisJSON || !redisJSON.response) {
                return { data: [], isSearchNeeded: true, errorMsg: 'Invalid cache data format' };
            }
            return {
                data: redisJSON.response,
                isSearchNeeded: false,
                hashKey: hashKey,
            };
        }
        catch (error) {
            return {
                data: [],
                isSearchNeeded: true,
                errorMsg: error,
            };
        }
    }
    async listCacheKeys(pattern = '*') {
        try {
            const keys = await this.client.keys(pattern);
            console.log(`🔍 ~ listCacheKeys ~ Found ${keys.length} keys matching pattern: ${pattern}`);
            return keys || [];
        }
        catch (error) {
            console.error('~ listCacheKeys ~ error:', error);
            return [];
        }
    }
};
exports.CachingUtility = CachingUtility;
exports.CachingUtility = CachingUtility = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CACHE_INSTANCE')),
    __metadata("design:paramtypes", [cacheable_1.Cacheable])
], CachingUtility);
//# sourceMappingURL=caching.utility.js.map