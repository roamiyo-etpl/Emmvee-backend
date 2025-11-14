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
exports.Airports = void 0;
const typeorm_1 = require("typeorm");
const accounts_enum_1 = require("../enums/accounts.enum");
let Airports = class Airports {
    id;
    code;
    latitude;
    longitude;
    name;
    city;
    state;
    country;
    icao;
    woeid;
    tz;
    phone;
    type;
    email;
    url;
    runway_length;
    elev;
    direct_flights;
    carriers;
    timezone;
    status;
    is_deleted;
    created_at;
    updated_at;
    created_by;
    updated_by;
};
exports.Airports = Airports;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Airports.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Airports.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Airports.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Airports.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], Airports.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 150 }),
    __metadata("design:type", String)
], Airports.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 150 }),
    __metadata("design:type", String)
], Airports.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 150 }),
    __metadata("design:type", String)
], Airports.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "icao", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "woeid", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "tz", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "runway_length", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "elev", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "direct_flights", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 250, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "carriers", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: true }),
    __metadata("design:type", String)
], Airports.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: accounts_enum_1.StatusEnum,
        default: accounts_enum_1.StatusEnum.ACTIVE,
    }),
    __metadata("design:type", String)
], Airports.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'This will be used for soft delete',
    }),
    __metadata("design:type", Boolean)
], Airports.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Airports.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Airports.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Airports.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Airports.prototype, "updated_by", void 0);
exports.Airports = Airports = __decorate([
    (0, typeorm_1.Entity)('airports')
], Airports);
//# sourceMappingURL=airports.entity.js.map