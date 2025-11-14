import { DataSource, Repository } from 'typeorm';
import { Booking } from 'src/shared/entities/bookings.entity';
import { BookingLog } from 'src/shared/entities/booking-logs.entity';
import { BookingAdditionalDetail } from 'src/shared/entities/booking-additional-details.entity';
export declare class BookRepository extends Repository<Booking> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    checkDuplicateBooking(reqParams: any): Promise<Booking | null>;
    insertBooking(reqParams: any): Promise<Booking>;
    getBookingByBookingId(reqParams: any): Promise<Booking>;
    storeBookingLog(reqParams: any): Promise<BookingLog>;
    getBookingLogByBookingLogId(reqParams: any): Promise<BookingLog>;
    updateBookingLogData(reqParams: any): Promise<BookingLog>;
    updateBookingWithSupplierDetails(reqParams: any): Promise<Booking>;
    private mapRoundTripOrderDetails;
    private mapSingleTripOrderDetails;
    private mapRoundTripLocationDetails;
    private mapLocationDetails;
    private mapBookingStatus;
    private mapOrderDetailData;
    private mapBasicBookingFields;
    private extractPassportData;
    private extractCancellationPolicy;
    createBookingAdditionalDetail(reqParams: any): Promise<BookingAdditionalDetail>;
    verifyBookingLog(reqParams: any): Promise<BookingLog>;
    private mapPassengersToPaxes;
    BookingStatusFailed(reqParams: any): Promise<Booking>;
}
