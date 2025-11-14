import { TboHotelAdditionalDetailsEntity } from 'src/modules/dump/hotel/entities/tbo-hotel-additional-details.entity';
import { BookingAdditionalDetail } from 'src/shared/entities/booking-additional-details.entity';
import { BookingLog } from 'src/shared/entities/booking-logs.entity';
import { Booking } from 'src/shared/entities/bookings.entity';
import { DataSource, Repository } from 'typeorm';
export declare class BookRepository extends Repository<Booking> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    checkDuplicateBooking(reqParams: any): Promise<Booking | null>;
    insertBooking(reqParams: any): Promise<Booking>;
    getBookingByBookingId(reqParams: any): Promise<Booking>;
    storeBookingLog(reqParams: any): Promise<BookingLog>;
    getBookingLogByBookingLogId(reqParams: any): Promise<BookingLog>;
    getBookingAdditionalDetailByBookingRefId(reqParams: any): Promise<BookingAdditionalDetail>;
    createBookingAdditionalDetail(reqParams: any): Promise<BookingAdditionalDetail>;
    updateBookingLogData(reqParams: any): Promise<BookingLog>;
    verifyBookingLog(reqParams: any): Promise<BookingLog>;
    updateBookingWithSupplierDetails(reqParams: any): Promise<Booking>;
    updateBookingWithSupplierFailed(reqParams: any): Promise<Booking>;
    private calculateNights;
    private parsePriceHash;
    getHotelDetails(reqParams: any): Promise<TboHotelAdditionalDetailsEntity>;
    private convertBookingResponse;
    private transformDayRatesToNightly;
}
