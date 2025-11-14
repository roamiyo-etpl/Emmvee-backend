export declare enum PaymentStatus {
    DEFAULT = "DEFAULT",
    PENDING = "PENDING",
    CAPTURED = "CAPTURED",
    VOIDED = "VOIDED",
    FAILED = "FAILED"
}
export declare class BookingLog {
    id: number;
    log_id: string;
    booking_reference_id: string;
    user_id: string;
    data: Record<string, any>;
    is_verified: boolean;
    payment_status: PaymentStatus;
    transaction_id: string | null;
    created_at: Date;
    updated_at: Date;
}
