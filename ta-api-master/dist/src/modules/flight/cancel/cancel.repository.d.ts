import { DataSource, Repository } from 'typeorm';
import { Booking } from 'src/shared/entities/bookings.entity';
import { Cancellation } from 'src/shared/entities/cancellations.entity';
export declare class CancelRepository extends Repository<Booking> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createCancellationRecord(params: {
        bookingId: string;
        cancellationResponse: any;
        cancellationStatus: boolean;
        requestType?: string;
        cancellationType?: string;
        ticketIds?: number[];
    }): Promise<Cancellation>;
    getCancellationsByBookingId(params: {
        bookingId: string;
    }): Promise<Cancellation[]>;
    updateCancellationDetails(params: {
        bookingId: string;
        cancellationResponse: any;
        cancellationStatus: boolean;
        requestType?: string;
        cancellationType?: string;
    }): Promise<void>;
    private mapRequestType;
    private mapCancellationType;
    private mapCancellationStatus;
}
