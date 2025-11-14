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
exports.OrderDetailRepository = void 0;
const common_1 = require("@nestjs/common");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
const typeorm_1 = require("typeorm");
let OrderDetailRepository = class OrderDetailRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(bookings_entity_1.Booking, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getAllPendingBookings() {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        return this.find({ where: { booking_status: bookings_entity_1.BookingStatus.PENDING }, relations: ['bookingAdditionalDetails'] });
    }
    async updateBookingStatus(bookingId, bookingStatus) {
        await this.update(bookingId, { booking_status: bookingStatus, updated_at: new Date() });
    }
    async getInProgressBookings() {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        return this.find({
            where: {
                booking_status: bookings_entity_1.BookingStatus.INPROGRESS,
                created_at: (0, typeorm_1.LessThanOrEqual)(twoHoursAgo),
            },
            relations: ['bookingAdditionalDetails'],
        });
    }
    async updateInProgressToFailed(bookingId) {
        await this.update(bookingId, { booking_status: bookings_entity_1.BookingStatus.FAILED, updated_at: new Date() });
    }
};
exports.OrderDetailRepository = OrderDetailRepository;
exports.OrderDetailRepository = OrderDetailRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrderDetailRepository);
//# sourceMappingURL=order-detail.repository.js.map