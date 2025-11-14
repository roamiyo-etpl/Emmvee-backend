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
exports.SearchService = void 0;
const provider_search_service_1 = require("../providers/provider-search.service");
const common_1 = require("@nestjs/common");
let SearchService = class SearchService {
    providerSearchService;
    constructor(providerSearchService) {
        this.providerSearchService = providerSearchService;
    }
    async startRouting(searchReq, headers) {
        const response = await this.providerSearchService.providerSearch(searchReq, headers);
        return response;
    }
    async collectivePolling(searchReq) {
        const response = await this.providerSearchService.providerCheckRouting(searchReq);
        return response;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_search_service_1.ProviderSearchService])
], SearchService);
//# sourceMappingURL=search.service.js.map