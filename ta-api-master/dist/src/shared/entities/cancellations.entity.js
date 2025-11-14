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
exports.Cancellation = exports.CancellationTypeEnum = exports.CancellationRequestType = exports.CancellationStatusEnum = void 0;
const typeorm_1 = require("typeorm");
const bookings_entity_1 = require("./bookings.entity");
var CancellationStatusEnum;
(function (CancellationStatusEnum) {
    CancellationStatusEnum[CancellationStatusEnum["Unassigned"] = 0] = "Unassigned";
    CancellationStatusEnum[CancellationStatusEnum["Assigned"] = 1] = "Assigned";
    CancellationStatusEnum[CancellationStatusEnum["Acknowledged"] = 2] = "Acknowledged";
    CancellationStatusEnum[CancellationStatusEnum["Completed"] = 3] = "Completed";
    CancellationStatusEnum[CancellationStatusEnum["Rejected"] = 4] = "Rejected";
    CancellationStatusEnum[CancellationStatusEnum["Closed"] = 5] = "Closed";
    CancellationStatusEnum[CancellationStatusEnum["Pending"] = 6] = "Pending";
    CancellationStatusEnum[CancellationStatusEnum["Other"] = 7] = "Other";
})(CancellationStatusEnum || (exports.CancellationStatusEnum = CancellationStatusEnum = {}));
var CancellationRequestType;
(function (CancellationRequestType) {
    CancellationRequestType[CancellationRequestType["FullCancellation"] = 1] = "FullCancellation";
    CancellationRequestType[CancellationRequestType["PartialCancellation"] = 2] = "PartialCancellation";
    CancellationRequestType[CancellationRequestType["Reissuance"] = 3] = "Reissuance";
})(CancellationRequestType || (exports.CancellationRequestType = CancellationRequestType = {}));
var CancellationTypeEnum;
(function (CancellationTypeEnum) {
    CancellationTypeEnum[CancellationTypeEnum["NotSet"] = 0] = "NotSet";
    CancellationTypeEnum[CancellationTypeEnum["NoShow"] = 1] = "NoShow";
    CancellationTypeEnum[CancellationTypeEnum["FlightCancelled"] = 2] = "FlightCancelled";
    CancellationTypeEnum[CancellationTypeEnum["Others"] = 3] = "Others";
})(CancellationTypeEnum || (exports.CancellationTypeEnum = CancellationTypeEnum = {}));
let Cancellation = class Cancellation extends typeorm_1.BaseEntity {
    cancellation_id;
    booking_id;
    booking;
    booking_reference_id;
    supplier_reference_id;
    ticket_ids;
    change_request_id;
    trace_id;
    cancel_date;
    status;
    cancellation_charge;
    refunded_amount;
    remarks;
    request_type;
    cancellation_type;
    credit_note_no;
    credit_note_created_on;
    additional_data;
    created_at;
    updated_at;
    created_by;
    updated_by;
};
exports.Cancellation = Cancellation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Cancellation.prototype, "cancellation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Cancellation.prototype, "booking_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bookings_entity_1.Booking, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'booking_id' }),
    __metadata("design:type", bookings_entity_1.Booking)
], Cancellation.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: false }),
    __metadata("design:type", String)
], Cancellation.prototype, "booking_reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Cancellation.prototype, "supplier_reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "ticket_ids", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "change_request_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "trace_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: false }),
    __metadata("design:type", Date)
], Cancellation.prototype, "cancel_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CancellationStatusEnum, nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "cancellation_charge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "refunded_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CancellationRequestType, nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "request_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CancellationTypeEnum, nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "cancellation_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "credit_note_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "credit_note_created_on", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "additional_data", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Cancellation.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Cancellation.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Cancellation.prototype, "updated_by", void 0);
exports.Cancellation = Cancellation = __decorate([
    (0, typeorm_1.Entity)('cancellations'),
    (0, typeorm_1.Index)(['booking_id']),
    (0, typeorm_1.Index)(['change_request_id'])
], Cancellation);
//# sourceMappingURL=cancellations.entity.js.map