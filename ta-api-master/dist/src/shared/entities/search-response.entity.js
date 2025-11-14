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
exports.SearchResponse = void 0;
const typeorm_1 = require("typeorm");
let SearchResponse = class SearchResponse {
    id;
    search_id;
    provider_name;
    response;
    provider_count;
    status;
    date;
};
exports.SearchResponse = SearchResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], SearchResponse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], SearchResponse.prototype, "search_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], SearchResponse.prototype, "provider_name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], SearchResponse.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: 0 }),
    __metadata("design:type", Number)
], SearchResponse.prototype, "provider_count", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { comment: '0 = pending, 1 = response returned' }),
    __metadata("design:type", Number)
], SearchResponse.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], SearchResponse.prototype, "date", void 0);
exports.SearchResponse = SearchResponse = __decorate([
    (0, typeorm_1.Entity)('search_response')
], SearchResponse);
//# sourceMappingURL=search-response.entity.js.map