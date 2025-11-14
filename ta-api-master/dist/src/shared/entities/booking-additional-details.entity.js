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
exports.BookingAdditionalDetail = exports.AddBookingType = void 0;
const typeorm_1 = require("typeorm");
const bookings_entity_1 = require("./bookings.entity");
var AddBookingType;
(function (AddBookingType) {
    AddBookingType["DEFAULT_BOOKING"] = "default booking";
    AddBookingType["MANUALLY_BOOKING"] = "manually booking";
})(AddBookingType || (exports.AddBookingType = AddBookingType = {}));
let BookingAdditionalDetail = class BookingAdditionalDetail extends typeorm_1.BaseEntity {
    booking_detail_id;
    booking_id;
    booking;
    booking_reference_id;
    booking_item;
    customer_comment;
    admin_comment;
    additional_notes;
    add_booking_type;
    payment_logs;
    supplier_response;
    api_response;
    terms_cancellation_policy;
    booking_extras;
    room_info;
    pre_book_details;
    shared_booking_details;
    passport_document_data;
    admin_payment_details;
    gst_details;
    created_at;
    updated_at;
    created_by;
    updated_by;
};
exports.BookingAdditionalDetail = BookingAdditionalDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "booking_detail_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "booking_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bookings_entity_1.Booking, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'booking_id' }),
    __metadata("design:type", bookings_entity_1.Booking)
], BookingAdditionalDetail.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "booking_reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], BookingAdditionalDetail.prototype, "booking_item", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "customer_comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "admin_comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "additional_notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AddBookingType,
        default: AddBookingType.DEFAULT_BOOKING,
    }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "add_booking_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "payment_logs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "supplier_response", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "api_response", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BookingAdditionalDetail.prototype, "terms_cancellation_policy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "booking_extras", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "room_info", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "pre_book_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "shared_booking_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "passport_document_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "admin_payment_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "gst_details", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], BookingAdditionalDetail.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], BookingAdditionalDetail.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], BookingAdditionalDetail.prototype, "updated_by", void 0);
exports.BookingAdditionalDetail = BookingAdditionalDetail = __decorate([
    (0, typeorm_1.Entity)('bookings_additional_detail')
], BookingAdditionalDetail);
//# sourceMappingURL=booking-additional-details.entity.js.map