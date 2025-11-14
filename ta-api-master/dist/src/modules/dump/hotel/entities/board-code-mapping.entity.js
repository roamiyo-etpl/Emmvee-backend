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
exports.BoardCodeMappingEntity = void 0;
const typeorm_1 = require("typeorm");
const board_code_master_entity_1 = require("./board-code-master.entity");
let BoardCodeMappingEntity = class BoardCodeMappingEntity {
    boardCodeMappingId;
    boardCodeId;
    supplierCode;
    boardCode;
    supplierTitle;
    titleEnglish;
    isDeleted;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
    boardCodeMaster;
};
exports.BoardCodeMappingEntity = BoardCodeMappingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BoardCodeMappingEntity.prototype, "boardCodeMappingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_code_id', type: 'uuid' }),
    __metadata("design:type", String)
], BoardCodeMappingEntity.prototype, "boardCodeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], BoardCodeMappingEntity.prototype, "supplierCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], BoardCodeMappingEntity.prototype, "boardCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_title', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BoardCodeMappingEntity.prototype, "supplierTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title_english', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BoardCodeMappingEntity.prototype, "titleEnglish", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], BoardCodeMappingEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], BoardCodeMappingEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], BoardCodeMappingEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BoardCodeMappingEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BoardCodeMappingEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_code_master_entity_1.BoardCodeMasterEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'board_code_id' }),
    __metadata("design:type", board_code_master_entity_1.BoardCodeMasterEntity)
], BoardCodeMappingEntity.prototype, "boardCodeMaster", void 0);
exports.BoardCodeMappingEntity = BoardCodeMappingEntity = __decorate([
    (0, typeorm_1.Entity)('board_code_mapping')
], BoardCodeMappingEntity);
//# sourceMappingURL=board-code-mapping.entity.js.map