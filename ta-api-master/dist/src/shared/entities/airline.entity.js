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
exports.Airline = void 0;
const typeorm_1 = require("typeorm");
const accounts_enum_1 = require("../enums/accounts.enum");
let Airline = class Airline {
    id;
    code;
    name;
    web_checkin_url;
    status;
    is_deleted;
    created_at;
    updated_at;
    created_by;
    updated_by;
};
exports.Airline = Airline;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Airline.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Airline.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], Airline.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 500, nullable: true }),
    __metadata("design:type", String)
], Airline.prototype, "web_checkin_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: accounts_enum_1.StatusEnum,
        default: accounts_enum_1.StatusEnum.ACTIVE,
    }),
    __metadata("design:type", String)
], Airline.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'This will be used for soft delete',
    }),
    __metadata("design:type", Boolean)
], Airline.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Airline.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Airline.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Airline.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Airline.prototype, "updated_by", void 0);
exports.Airline = Airline = __decorate([
    (0, typeorm_1.Entity)('airline')
], Airline);
//# sourceMappingURL=airline.entity.js.map