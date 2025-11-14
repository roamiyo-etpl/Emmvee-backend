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
exports.StateEntity = void 0;
const typeorm_1 = require("typeorm");
let StateEntity = class StateEntity {
    stateId;
    stateName;
    countryId;
    countryCode;
    countryName;
    iso2;
    iso3166_2;
    fipsCode;
    type;
    latitude;
    longitude;
    timezone;
};
exports.StateEntity = StateEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'state_id', type: 'int' }),
    __metadata("design:type", Number)
], StateEntity.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], StateEntity.prototype, "stateName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'int' }),
    __metadata("design:type", Number)
], StateEntity.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], StateEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], StateEntity.prototype, "countryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso2', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], StateEntity.prototype, "iso2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso3166_2', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], StateEntity.prototype, "iso3166_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fips_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], StateEntity.prototype, "fipsCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], StateEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latitude', type: 'double precision' }),
    __metadata("design:type", Number)
], StateEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'longitude', type: 'double precision' }),
    __metadata("design:type", Number)
], StateEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timezone', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], StateEntity.prototype, "timezone", void 0);
exports.StateEntity = StateEntity = __decorate([
    (0, typeorm_1.Entity)('state')
], StateEntity);
//# sourceMappingURL=state.entity.js.map