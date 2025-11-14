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
exports.ProviderMaster = void 0;
const typeorm_1 = require("typeorm");
let ProviderMaster = class ProviderMaster {
    provider_id;
    name;
    code;
    provider_mode;
    provider_credentials;
    is_active;
    authToken;
    module_type;
    tokenUpdatedAt;
    updated_by;
    updated_at;
};
exports.ProviderMaster = ProviderMaster;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProviderMaster.prototype, "provider_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Test', 'Production'],
        default: 'Test',
    }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "provider_mode", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "provider_credentials", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Active', 'Inactive'],
        default: 'Active',
    }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "authToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Hotel', 'Flight'],
        default: 'Flight',
    }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "module_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_updated_at', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "tokenUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Number)
], ProviderMaster.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", String)
], ProviderMaster.prototype, "updated_at", void 0);
exports.ProviderMaster = ProviderMaster = __decorate([
    (0, typeorm_1.Entity)('provider_master')
], ProviderMaster);
//# sourceMappingURL=provider-master.entity.js.map