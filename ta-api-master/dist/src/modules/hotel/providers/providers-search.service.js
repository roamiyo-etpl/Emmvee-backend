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
exports.ProvidersSearchService = void 0;
const common_1 = require("@nestjs/common");
const hotelbeds_search_service_1 = require("./hotelbeds/hotelbeds-search.service");
const tbo_search_service_1 = require("./tbo/tbo-search.service");
let ProvidersSearchService = class ProvidersSearchService {
    hotelbedsSearchService;
    tboSearchService;
    constructor(hotelbedsSearchService, tboSearchService) {
        this.hotelbedsSearchService = hotelbedsSearchService;
        this.tboSearchService = tboSearchService;
    }
    async searchInitiate(searchReq, headers) {
        const { activeProviders } = searchReq;
        const searchRequest = [];
        searchRequest['searchReqId'] = searchReq['searchReqId'];
        try {
            const searchResults = [];
            const activeProvidersName = activeProviders.map((data) => data.providerCredentials.provider);
            const language = headers['language']?.toUpperCase() || 'en';
            Object.assign(searchReq, { currency: headers['currency-preference']?.toUpperCase() || 'USD' });
            Object.assign(searchReq, { language: language });
            searchRequest['language'] = language;
            searchRequest['searchReq'] = searchReq;
            if (activeProvidersName.indexOf('HOB') !== -1) {
                const hobCred = activeProviders.filter((item) => {
                    return item.code == 'HOB';
                });
                let hotelbedsSearchResult;
                searchRequest['assignedId'] = hobCred[0]?.assignedId;
                searchRequest['providerCred'] = hobCred[0]?.providerCredentials;
                searchResults.push(hotelbedsSearchResult);
            }
            if (activeProvidersName.indexOf('TBO') !== -1) {
                const tboCred = activeProviders.filter((item) => {
                    return item.providerCredentials.provider == 'TBO';
                });
                if (tboCred.length > 0) {
                    const tboSearchResult = this.tboSearchService.search(searchReq, tboCred[0]?.providerCredentials);
                    searchResults.push(tboSearchResult);
                }
            }
            let result;
            try {
                result = await Promise.race(searchResults);
            }
            catch (error) {
                console.log('supplier search error', error);
                throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
            }
            const results = result;
            return results;
        }
        catch (error) {
            console.log('supplier search error', error);
            throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
        }
    }
};
exports.ProvidersSearchService = ProvidersSearchService;
exports.ProvidersSearchService = ProvidersSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hotelbeds_search_service_1.HotelbedsSearchService,
        tbo_search_service_1.TboSearchService])
], ProvidersSearchService);
//# sourceMappingURL=providers-search.service.js.map