import { ConflictException } from '@nestjs/common';
export declare class DuplicateBookingException extends ConflictException {
    constructor(existingBookingId: string, bookingStatus: string);
}
