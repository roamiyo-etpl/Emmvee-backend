import { Booking } from 'src/shared/entities/bookings.entity';
import { DataSource, Repository } from 'typeorm';
export declare class OrderDetailRepository extends Repository<Booking> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getAllPendingBookings(): Promise<Booking[]>;
    updateBookingStatus(bookingId: string, bookingStatus: number): Promise<void>;
    getInProgressBookings(): Promise<Booking[]>;
    updateInProgressToFailed(bookingId: string): Promise<void>;
}
