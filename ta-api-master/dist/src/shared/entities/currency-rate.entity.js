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
exports.CurrencyConversionEntity = void 0;
const typeorm_1 = require("typeorm");
const common_enum_1 = require("../enums/common.enum");
const CurrencyPlacementEnumValue = Object.keys(common_enum_1.CurrencyPlacementEnum)
    .filter((key) => isNaN(Number(common_enum_1.CurrencyPlacementEnum[key])))
    .map((key) => `${key} = ${common_enum_1.CurrencyPlacementEnum[key]}`)
    .join(', ');
let CurrencyConversionEntity = class CurrencyConversionEntity extends typeorm_1.BaseEntity {
    id;
    name;
    symbol;
    code;
    baseRateUSD;
    symbolPlacement;
    countries;
    isActive;
    isDeleted;
    updatedAt;
    updateTimestamp() {
        this.updatedAt = new Date();
    }
};
exports.CurrencyConversionEntity = CurrencyConversionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CurrencyConversionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], CurrencyConversionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'symbol', type: 'varchar', length: 6 }),
    __metadata("design:type", String)
], CurrencyConversionEntity.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], CurrencyConversionEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_rate_USD', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], CurrencyConversionEntity.prototype, "baseRateUSD", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'symbol_placement',
        type: 'enum',
        enum: common_enum_1.CurrencyPlacementEnum,
        default: common_enum_1.CurrencyPlacementEnum.BEFORE,
        comment: CurrencyPlacementEnumValue,
    }),
    __metadata("design:type", String)
], CurrencyConversionEntity.prototype, "symbolPlacement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'countries', type: 'jsonb', nullable: true }),
    __metadata("design:type", String)
], CurrencyConversionEntity.prototype, "countries", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true, comment: '0 = inactive, 1 = active' }),
    __metadata("design:type", Boolean)
], CurrencyConversionEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', default: false, comment: '0 = not deleted, 1 = deleted' }),
    __metadata("design:type", Boolean)
], CurrencyConversionEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMPTZ', nullable: true }),
    __metadata("design:type", Date)
], CurrencyConversionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CurrencyConversionEntity.prototype, "updateTimestamp", null);
exports.CurrencyConversionEntity = CurrencyConversionEntity = __decorate([
    (0, typeorm_1.Entity)('currency_conversion')
], CurrencyConversionEntity);
//# sourceMappingURL=currency-rate.entity.js.map