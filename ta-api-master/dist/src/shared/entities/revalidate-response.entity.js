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
exports.RevalidateResponseEntity = void 0;
const typeorm_1 = require("typeorm");
let RevalidateResponseEntity = class RevalidateResponseEntity {
    id;
    solution_id;
    response;
    provider_code;
    created_at;
    updated_at;
};
exports.RevalidateResponseEntity = RevalidateResponseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], RevalidateResponseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], RevalidateResponseEntity.prototype, "solution_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], RevalidateResponseEntity.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], RevalidateResponseEntity.prototype, "provider_code", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RevalidateResponseEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RevalidateResponseEntity.prototype, "updated_at", void 0);
exports.RevalidateResponseEntity = RevalidateResponseEntity = __decorate([
    (0, typeorm_1.Entity)('revalidate_response')
], RevalidateResponseEntity);
//# sourceMappingURL=revalidate-response.entity.js.map