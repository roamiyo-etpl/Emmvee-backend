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
exports.Booking = exports.JourneyType = exports.BookingFrom = exports.FailureReason = exports.PayMode = exports.PaymentMethod = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const booking_additional_details_entity_1 = require("./booking-additional-details.entity");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["PENDING"] = 0] = "PENDING";
    BookingStatus[BookingStatus["CONFIRMED"] = 1] = "CONFIRMED";
    BookingStatus[BookingStatus["BOOKED"] = 2] = "BOOKED";
    BookingStatus[BookingStatus["CANCELLED"] = 3] = "CANCELLED";
    BookingStatus[BookingStatus["FAILED"] = 4] = "FAILED";
    BookingStatus[BookingStatus["DATES_NOT_AVAILABLE"] = 5] = "DATES_NOT_AVAILABLE";
    BookingStatus[BookingStatus["DEPOSIT"] = 6] = "DEPOSIT";
    BookingStatus[BookingStatus["INPROGRESS"] = 9] = "INPROGRESS";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CARD"] = "card";
    PaymentMethod["COUPON"] = "coupon";
    PaymentMethod["COMBINED"] = "combined";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PayMode;
(function (PayMode) {
    PayMode["CASH"] = "cash";
    PayMode["COUPON"] = "coupon";
    PayMode["LP"] = "lp";
    PayMode["TC"] = "tc";
})(PayMode || (exports.PayMode = PayMode = {}));
var FailureReason;
(function (FailureReason) {
    FailureReason[FailureReason["PAYMENT"] = 1] = "PAYMENT";
    FailureReason[FailureReason["SUPPLIER_API"] = 2] = "SUPPLIER_API";
    FailureReason[FailureReason["INSUFFICIENT_TC"] = 3] = "INSUFFICIENT_TC";
    FailureReason[FailureReason["INSUFFICIENT_LP"] = 4] = "INSUFFICIENT_LP";
    FailureReason[FailureReason["OTHER"] = 5] = "OTHER";
})(FailureReason || (exports.FailureReason = FailureReason = {}));
var BookingFrom;
(function (BookingFrom) {
    BookingFrom["WEB"] = "web";
    BookingFrom["MOBILE"] = "mobile";
})(BookingFrom || (exports.BookingFrom = BookingFrom = {}));
var JourneyType;
(function (JourneyType) {
    JourneyType["ONEWAY"] = "oneway";
    JourneyType["ROUNDTRIP"] = "roundtrip";
    JourneyType["MULTI_CITY"] = "multi-city";
})(JourneyType || (exports.JourneyType = JourneyType = {}));
let Booking = class Booking extends typeorm_1.BaseEntity {
    booking_id;
    booking_reference_id;
    supplier_reference_id;
    legacy_booking_id;
    search_id;
    booking_date;
    user_id;
    account_id;
    contact_details;
    supplier_name;
    reference_id;
    module_type;
    guest_name;
    guest_account_id;
    item_id;
    sub_item_id;
    booking_status;
    gateway_name;
    transaction_id;
    payment_method;
    pay_mode;
    destination_country;
    destination_city;
    destination_code;
    origin_country;
    origin_city;
    origin_code;
    checkin;
    checkout;
    failure_reason;
    booking_from;
    journey_type;
    number_of_nights;
    paxes;
    is_verified;
    mwr_log_id;
    total;
    public_price;
    net_price;
    cash_amount;
    tax;
    currency_code;
    live_currency_rate;
    discounts;
    savings_amount;
    savings_percentage;
    applied_coupon_details;
    applied_lp;
    applied_tc;
    is_refundable;
    created_at;
    updated_at;
    created_by;
    updated_by;
    bookingAdditionalDetails;
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Booking.prototype, "booking_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: false, unique: true }),
    __metadata("design:type", String)
], Booking.prototype, "booking_reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "supplier_reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "legacy_booking_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "search_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: false }),
    __metadata("design:type", Date)
], Booking.prototype, "booking_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Booking.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Booking.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Booking.prototype, "contact_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Booking.prototype, "supplier_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "module_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "guest_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "guest_account_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "sub_item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BookingStatus, nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "booking_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "gateway_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PaymentMethod, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PayMode, array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "pay_mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "destination_country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "destination_city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "destination_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "origin_country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "origin_city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "origin_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "checkin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "checkout", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: FailureReason, nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "failure_reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BookingFrom, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "booking_from", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: JourneyType, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "journey_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "number_of_nights", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "paxes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "is_verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "mwr_log_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "public_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "net_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "cash_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "currency_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "live_currency_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "discounts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "savings_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "savings_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "applied_coupon_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "applied_lp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "applied_tc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "is_refundable", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Booking.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Booking.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => booking_additional_details_entity_1.BookingAdditionalDetail, (bookingAdditionalDetail) => bookingAdditionalDetail.booking),
    __metadata("design:type", booking_additional_details_entity_1.BookingAdditionalDetail)
], Booking.prototype, "bookingAdditionalDetails", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)('bookings'),
    (0, typeorm_1.Index)(['booking_reference_id'], { unique: true })
], Booking);
//# sourceMappingURL=bookings.entity.js.map