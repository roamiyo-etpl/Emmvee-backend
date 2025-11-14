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
exports.SupplierLogFlight = void 0;
const typeorm_1 = require("typeorm");
let SupplierLogFlight = class SupplierLogFlight extends typeorm_1.BaseEntity {
    supplier_log_id;
    log_id;
    title;
    search_req_id;
    booking_reference_id;
    path_url;
    created_at;
};
exports.SupplierLogFlight = SupplierLogFlight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SupplierLogFlight.prototype, "supplier_log_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], SupplierLogFlight.prototype, "log_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], SupplierLogFlight.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SupplierLogFlight.prototype, "search_req_id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], SupplierLogFlight.prototype, "booking_reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], SupplierLogFlight.prototype, "path_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], SupplierLogFlight.prototype, "created_at", void 0);
exports.SupplierLogFlight = SupplierLogFlight = __decorate([
    (0, typeorm_1.Entity)('supplier_log_flight')
], SupplierLogFlight);
//# sourceMappingURL=supplier-log-flight.entity.js.map