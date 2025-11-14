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
exports.AmenityMappingEntity = void 0;
const typeorm_1 = require("typeorm");
const amenity_master_entity_1 = require("./amenity-master.entity");
let AmenityMappingEntity = class AmenityMappingEntity {
    amenityMappingId;
    amenityId;
    code;
    title;
    titleEnglish;
    supplierCode;
    groupCode;
    createdAt;
    updatedAt;
    amenityMaster;
};
exports.AmenityMappingEntity = AmenityMappingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "amenityMappingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amenity_id', type: 'uuid' }),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "amenityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title_english', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "titleEnglish", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "supplierCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], AmenityMappingEntity.prototype, "groupCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], AmenityMappingEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], AmenityMappingEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => amenity_master_entity_1.AmenityMasterEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'amenity_id' }),
    __metadata("design:type", amenity_master_entity_1.AmenityMasterEntity)
], AmenityMappingEntity.prototype, "amenityMaster", void 0);
exports.AmenityMappingEntity = AmenityMappingEntity = __decorate([
    (0, typeorm_1.Entity)('amenity_mapping'),
    (0, typeorm_1.Index)(['amenityId']),
    (0, typeorm_1.Index)(['code', 'supplierCode']),
    (0, typeorm_1.Index)(['supplierCode', 'groupCode']),
    (0, typeorm_1.Index)(['title'])
], AmenityMappingEntity);
//# sourceMappingURL=amenity-mapping.entity.js.map