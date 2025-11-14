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
exports.BoardCodeMasterEntity = void 0;
const typeorm_1 = require("typeorm");
let BoardCodeMasterEntity = class BoardCodeMasterEntity {
    boardCodeId;
    alias;
    titleEnglish;
    isDeleted;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.BoardCodeMasterEntity = BoardCodeMasterEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BoardCodeMasterEntity.prototype, "boardCodeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alias', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], BoardCodeMasterEntity.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title_english', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BoardCodeMasterEntity.prototype, "titleEnglish", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], BoardCodeMasterEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], BoardCodeMasterEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], BoardCodeMasterEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BoardCodeMasterEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BoardCodeMasterEntity.prototype, "updatedBy", void 0);
exports.BoardCodeMasterEntity = BoardCodeMasterEntity = __decorate([
    (0, typeorm_1.Entity)('board_code_master')
], BoardCodeMasterEntity);
//# sourceMappingURL=board-code-master.entity.js.map