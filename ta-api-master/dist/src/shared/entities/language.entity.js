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
exports.LanguageEntity = void 0;
const typeorm_1 = require("typeorm");
const common_enum_1 = require("../enums/common.enum");
const LanguageTypeEnumValue = Object.keys(common_enum_1.LanguageType)
    .filter((key) => isNaN(Number(common_enum_1.LanguageType[key])))
    .map((key) => `${key} = ${common_enum_1.LanguageType[key]}`)
    .join(', ');
let LanguageEntity = class LanguageEntity {
    id;
    key;
    english;
    french;
    german;
    hungarian;
    italian;
    korean;
    portuguese;
    romanian;
    russian;
    spanish;
    type;
    isActive;
    createdAt;
};
exports.LanguageEntity = LanguageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], LanguageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'key', type: 'text', unique: true, nullable: false }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'english', type: 'text', nullable: false }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "english", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'french', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "french", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'german', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "german", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hungarian', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "hungarian", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'italian', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "italian", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'korean', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "korean", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'portuguese', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "portuguese", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'romanian', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "romanian", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'russian', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "russian", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spanish', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "spanish", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: common_enum_1.LanguageType,
        default: common_enum_1.LanguageType.LTR,
        comment: LanguageTypeEnumValue,
    }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], LanguageEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], LanguageEntity.prototype, "createdAt", void 0);
exports.LanguageEntity = LanguageEntity = __decorate([
    (0, typeorm_1.Entity)('language')
], LanguageEntity);
//# sourceMappingURL=language.entity.js.map