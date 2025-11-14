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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderSearchService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../configuration/configuration.service");
const uuid_1 = require("uuid");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
const generic_repo_utility_1 = require("../../../shared/utilities/flight/generic-repo.utility");
const start_routing_interface_1 = require("../search/interfaces/start-routing.interface");
const check_routing_interface_1 = require("../search/interfaces/check-routing.interface");
const provider_repo_service_1 = require("./provider-repo.service");
const moment_1 = __importDefault(require("moment"));
const tbo_search_service_1 = require("./tbo/tbo-search.service");
let ProviderSearchService = class ProviderSearchService {
    configService;
    genericRepo;
    providerRepoService;
    tboSearchService;
    constructor(configService, genericRepo, providerRepoService, tboSearchService) {
        this.configService = configService;
        this.genericRepo = genericRepo;
        this.providerRepoService = providerRepoService;
        this.tboSearchService = tboSearchService;
    }
    async providerSearch(searchReq, headers) {
        const activeProviders = await this.configService.getActiveProviderList({ module: 'Flight' });
        if (activeProviders.length) {
            const activeProvidersName = activeProviders.map((data) => data.code);
            const searchResults = [];
            const searchRequest = [];
            searchRequest['searchReq'] = searchReq;
            searchRequest['searchReqId'] = (0, uuid_1.v4)();
            searchRequest['headers'] = headers;
            const infantCount = generic_utility_1.Generic.getInfantCount(searchReq);
            const supplierCount = [];
            if (activeProvidersName.indexOf('TBO') !== -1) {
                const tboCred = activeProviders.filter((item) => {
                    return item.code == 'TBO';
                });
                searchRequest['providerCred'] = JSON.parse(tboCred[0].provider_credentials);
                const tboSearchResult = new Promise((resolve) => resolve(this.tboSearchService.search(searchRequest)));
                searchResults.push(tboSearchResult);
                supplierCount.push('TBO');
            }
            if (searchResults.length === 0) {
                throw new common_1.ServiceUnavailableException('There are no active providers available for the request.');
            }
            const result = await Promise.race(searchResults).catch((error) => {
                this.genericRepo.storeLogs(searchRequest['searchReqId'], 1, error, 0);
                throw new common_1.InternalServerErrorException('There is an issue while fetching data from the providers.');
            });
            const deDuplicatedData = this.deduplicationFilter(result, 'startRouting');
            const searchResponse = new start_routing_interface_1.StartRoutingResponse();
            searchResponse.searchReqId = result.searchReqId;
            searchResponse.mode = result.mode;
            searchResponse.error = result.error;
            searchResponse.message = result.message;
            searchResponse.route = deDuplicatedData;
            searchResponse.trackingId = result?.trackingId;
            if (supplierCount.length <= 1) {
                searchResponse.complete = true;
            }
            else {
                searchResponse.complete = false;
            }
            await this.providerRepoService.updateProviderCount(searchResponse.searchReqId, supplierCount.length);
            return searchResponse;
        }
        else {
            throw new common_1.ServiceUnavailableException('No active provider found.');
        }
    }
    async providerCheckRouting(searchReq) {
        const { searchReqId } = searchReq;
        const routingResponse = new check_routing_interface_1.CheckRoutingResponse();
        const checkProviderData = await this.providerRepoService.getAllResponseByID(searchReq);
        const activeProviders = await this.configService.getActiveProviderList({ module: 'Flight' });
        let mode = '';
        activeProviders.forEach((item) => {
            mode += mode == '' ? item.code + '-' + JSON.parse(item.provider_credentials).mode : '|' + item.code + '-' + JSON.parse(item.provider_credentials).mode;
        });
        const currentDate = (0, moment_1.default)();
        const dateDiff = checkProviderData.length > 0 ? currentDate.diff((0, moment_1.default)(checkProviderData[0].date), 'seconds') : 0;
        let statusComplete = false;
        if (checkProviderData.length > 0) {
            if (dateDiff >= 30 || checkProviderData.length >= checkProviderData[0].provider_count) {
                statusComplete = true;
            }
        }
        else {
            statusComplete = true;
        }
        if (checkProviderData.length > 0) {
            routingResponse.complete = statusComplete;
            const deDuplicatedData = this.deduplicationFilter(checkProviderData, 'checkRouting');
            routingResponse.searchReqId = searchReqId;
            routingResponse.mode = mode;
            routingResponse.route = deDuplicatedData;
            routingResponse.message = 'OK';
            routingResponse.route.sort((a, b) => a.fare[0].totalFare - b.fare[0].totalFare);
        }
        else {
            routingResponse.complete = statusComplete;
            routingResponse.searchReqId = searchReqId;
            routingResponse.mode = mode;
            routingResponse.route = [];
            routingResponse.message = 'No Data Found, Check again after few seconds.';
        }
        try {
            if (routingResponse.complete == true) {
                await this.providerRepoService.deleteSearchResult(searchReqId);
            }
        }
        catch (error) {
            this.genericRepo.storeLogs(searchReqId, 1, error, 0);
        }
        return routingResponse;
    }
    deduplicationFilter(allResult, type) {
        let mergeRes = [];
        if (type == 'startRouting') {
            mergeRes = [...allResult.route];
        }
        else {
            const resultArray = allResult;
            for (let i = 0; i < resultArray.length; i++) {
                if (typeof resultArray[i] != 'undefined')
                    mergeRes = [...mergeRes, ...JSON.parse(resultArray[i].response).route];
            }
        }
        console.log('before: ' + mergeRes.length);
        let groupHash;
        const filteredRes = [];
        for (let i = 0; i < mergeRes.length; i++) {
            groupHash = new start_routing_interface_1.GroupHash();
            const find = filteredRes.findIndex((item) => {
                if (mergeRes[i].solutionId.length > 1) {
                    return item.groupHashCode == mergeRes[i].groupHashCode;
                }
                else {
                    return item.hashCode[0] == mergeRes[i].hashCode[0];
                }
            });
            if (find == -1) {
                if (mergeRes[i].solutionId.length > 1) {
                    const duplicateOutbound = filteredRes.some((element) => element.hashCode[0] === mergeRes[i].hashCode[0]);
                    if (duplicateOutbound === true) {
                        mergeRes[i].isDuplicateOutbound = true;
                    }
                }
                filteredRes.push(mergeRes[i]);
            }
            else {
                groupHash.provider = mergeRes[i].groupHash[0].provider;
                groupHash.hashCode = mergeRes[i].groupHash[0].hashCode;
                groupHash.groupHashCode = mergeRes[i].groupHash[0].groupHashCode;
                groupHash.solutionId = mergeRes[i].groupHash[0].solutionId;
                groupHash.totalAmount = mergeRes[i].fare[0].totalFare;
                for (let s = 0; s < filteredRes[find].flightSegments.length; s++) {
                    if (mergeRes[i].flightSegments[s]) {
                        filteredRes[find].flightSegments[s].bookingCode = mergeRes[i].flightSegments[s].bookingCode
                            ? mergeRes[i].flightSegments[s].bookingCode
                            : filteredRes[find].flightSegments[s].bookingCode;
                    }
                }
                if (filteredRes[find].fare[0].totalFare > mergeRes[i].fare[0].totalFare) {
                    const isDuplicateOutbound = filteredRes[find].isDuplicateOutbound;
                    mergeRes[i].isDuplicateOutbound = isDuplicateOutbound;
                    filteredRes[find] = mergeRes[i];
                }
                filteredRes[find].groupHash.push(groupHash);
                filteredRes[find].groupHash.sort((a, b) => a.totalAmount - b.totalAmount);
            }
        }
        console.log('after: ' + filteredRes.length);
        return filteredRes;
    }
};
exports.ProviderSearchService = ProviderSearchService;
exports.ProviderSearchService = ProviderSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService,
        generic_repo_utility_1.GenericRepo,
        provider_repo_service_1.ProviderRepoService,
        tbo_search_service_1.TboSearchService])
], ProviderSearchService);
//# sourceMappingURL=provider-search.service.js.map