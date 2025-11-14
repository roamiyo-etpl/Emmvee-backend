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
exports.ProviderRepoService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const search_response_entity_1 = require("../../../shared/entities/search-response.entity");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
let ProviderRepoService = class ProviderRepoService {
    searchResponseRepo;
    constructor(searchResponseRepo) {
        this.searchResponseRepo = searchResponseRepo;
    }
    async storeSearchResponse(data, providerName = '') {
        const searchData = await this.getSearchResponseByID(data);
        let status = 0;
        if (!searchData) {
            status = 1;
        }
        const response = this.searchResponseRepo.create({
            search_id: data.searchReqId,
            provider_name: providerName != '' ? providerName : data.route[0].groupHash[0].provider[0],
            response: JSON.stringify(data),
            status: status,
            date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
        });
        return await this.searchResponseRepo.save(response);
    }
    async updateProviderCount(searchReqId, count) {
        return await this.searchResponseRepo.update({ search_id: searchReqId }, { provider_count: count });
    }
    async getAllResponseByID(data) {
        return await this.searchResponseRepo.find({ where: { search_id: data.searchReqId } });
    }
    async deleteSearchResult(searchReqId) {
        return await this.searchResponseRepo.delete({ search_id: searchReqId });
    }
    async getSearchResponseByID(data) {
        return await this.searchResponseRepo.findOne({ where: { search_id: data.searchReqId } });
    }
};
exports.ProviderRepoService = ProviderRepoService;
exports.ProviderRepoService = ProviderRepoService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(search_response_entity_1.SearchResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProviderRepoService);
//# sourceMappingURL=provider-repo.service.js.map