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
exports.BookingStatusUpdateScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const order_detail_service_1 = require("../../../modules/flight/order-details/order-detail.service");
let BookingStatusUpdateScheduler = class BookingStatusUpdateScheduler {
    orderDetailService;
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async updateBookingStatus() {
        console.log('Update booking status scheduler started');
        try {
            await this.orderDetailService.updateBookingStatus();
        }
        catch (error) {
            console.error('Error in update booking status scheduler', error);
        }
    }
    async updateInProgressToFailed() {
        console.log('Update in progress to failed scheduler started');
        try {
            await this.orderDetailService.updateInProgressToFailed();
        }
        catch (error) {
            console.error('Error in update in progress to failed scheduler', error);
        }
    }
};
exports.BookingStatusUpdateScheduler = BookingStatusUpdateScheduler;
__decorate([
    (0, schedule_1.Cron)('0 */10 * * * *', { name: 'UpdateBookingStatus' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingStatusUpdateScheduler.prototype, "updateBookingStatus", null);
__decorate([
    (0, schedule_1.Cron)('0 */30 * * * *', { name: 'UpdateInProgressToFailed' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingStatusUpdateScheduler.prototype, "updateInProgressToFailed", null);
exports.BookingStatusUpdateScheduler = BookingStatusUpdateScheduler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_detail_service_1.OrderDetailService])
], BookingStatusUpdateScheduler);
//# sourceMappingURL=booking-status-update.scheduler.js.map