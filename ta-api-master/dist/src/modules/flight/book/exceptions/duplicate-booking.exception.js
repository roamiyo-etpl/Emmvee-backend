"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateBookingException = void 0;
const common_1 = require("@nestjs/common");
class DuplicateBookingException extends common_1.ConflictException {
    constructor(existingBookingId, bookingStatus) {
        super({
            statusCode: 409,
            error: 'Duplicate Booking',
            message: `A booking with same details already exists (Booking ID: ${existingBookingId}). ` +
                `Status: ${bookingStatus}. ` +
                `Please wait for the current booking to complete or cancel it before creating a new one.`,
            existingBookingId,
            bookingStatus,
        });
    }
}
exports.DuplicateBookingException = DuplicateBookingException;
//# sourceMappingURL=duplicate-booking.exception.js.map