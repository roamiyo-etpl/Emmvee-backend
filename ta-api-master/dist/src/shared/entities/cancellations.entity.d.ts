import { BaseEntity } from 'typeorm';
import { Booking } from './bookings.entity';
export declare enum CancellationStatusEnum {
    Unassigned = 0,
    Assigned = 1,
    Acknowledged = 2,
    Completed = 3,
    Rejected = 4,
    Closed = 5,
    Pending = 6,
    Other = 7
}
export declare enum CancellationRequestType {
    FullCancellation = 1,
    PartialCancellation = 2,
    Reissuance = 3
}
export declare enum CancellationTypeEnum {
    NotSet = 0,
    NoShow = 1,
    FlightCancelled = 2,
    Others = 3
}
interface UserInfo {
    id: string;
    email: string;
    name: string;
}
export declare class Cancellation extends BaseEntity {
    cancellation_id: string;
    booking_id: string;
    booking: Booking;
    booking_reference_id: string;
    supplier_reference_id: string;
    ticket_ids: number[] | null;
    change_request_id: number | null;
    trace_id: string | null;
    cancel_date: Date;
    status: CancellationStatusEnum | null;
    cancellation_charge: number | null;
    refunded_amount: number | null;
    remarks: string | null;
    request_type: CancellationRequestType | null;
    cancellation_type: CancellationTypeEnum | null;
    credit_note_no: string | null;
    credit_note_created_on: Date | null;
    additional_data: any;
    created_at: Date;
    updated_at: Date;
    created_by: UserInfo;
    updated_by: UserInfo;
}
export {};
