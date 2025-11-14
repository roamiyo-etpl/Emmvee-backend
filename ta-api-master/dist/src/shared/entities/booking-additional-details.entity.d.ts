import { BaseEntity } from 'typeorm';
import { Booking } from './bookings.entity';
interface PaymentLog {
    [key: string]: any;
}
interface SupplierResponse {
    [key: string]: any;
}
interface ApiResponse {
    [key: string]: any;
}
interface BookingExtras {
    isCongratsPopup?: boolean;
    isTicketGenerated?: boolean;
    [key: string]: any;
}
interface RoomInfo {
    [key: string]: any;
}
interface PreBookDetails {
    preBookStatus: string;
    [key: string]: any;
}
interface SharedBookingDetails {
    isShared: boolean;
    sharedBookingCode: string;
    sharedBookingStatus: string;
    [key: string]: any;
}
interface PassportDocumentData {
    documentNumber: string;
    documentExpiryDate: string;
    passportIssuingCountry: string;
}
interface AdminPaymentDetails {
    paymentGatewayName: string;
    transactionId: string;
    payment_logs: any;
    [key: string]: any;
}
interface GSTDetails {
    gstCompanyAddress?: string;
    gstCompanyContactNumber?: string;
    gstCompanyName?: string;
    gstNumber?: string;
    gstCompanyEmail?: string;
}
interface UserInfo {
    id: string;
    email: string;
    name: string;
}
export declare enum AddBookingType {
    DEFAULT_BOOKING = "default booking",
    MANUALLY_BOOKING = "manually booking"
}
export declare class BookingAdditionalDetail extends BaseEntity {
    booking_detail_id: string;
    booking_id: string;
    booking: Booking;
    booking_reference_id: string;
    booking_item: number;
    customer_comment: string;
    admin_comment: string;
    additional_notes: string;
    add_booking_type: AddBookingType;
    payment_logs: PaymentLog;
    supplier_response: SupplierResponse;
    api_response: ApiResponse;
    terms_cancellation_policy: string;
    booking_extras: BookingExtras;
    room_info: RoomInfo;
    pre_book_details: PreBookDetails;
    shared_booking_details: SharedBookingDetails;
    passport_document_data: PassportDocumentData;
    admin_payment_details: AdminPaymentDetails;
    gst_details: GSTDetails;
    created_at: Date;
    updated_at: Date;
    created_by: UserInfo;
    updated_by: UserInfo;
}
export {};
