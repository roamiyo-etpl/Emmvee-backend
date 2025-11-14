import { BaseEntity } from 'typeorm';
import { BookingAdditionalDetail } from './booking-additional-details.entity';
import { GenderEnum } from '../enums/accounts.enum';
export interface ContactDetails {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: GenderEnum;
    email: string;
    dialCode: string;
    mobileNo: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
}
export interface PassengerTypeDetails {
    count: number;
    data?: paxesData[];
}
export interface paxesData {
    guestId?: number;
    type?: string;
    age?: number;
    dob?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    mobileNo?: string;
    dialCode?: string;
    title?: string;
    roomId?: number;
    email?: string;
    pan?: string;
    passportNumber?: string;
    passportIssueDate?: string;
    passportExpDate?: string;
    passportIssuingCountry?: string;
    nationality?: string;
}
export interface PaxGroup {
    adult: PassengerTypeDetails;
    child: PassengerTypeDetails;
    infant: PassengerTypeDetails;
}
interface Discounts {
    turbo: string;
    elite: string;
    newMember: string;
    special: string;
}
interface AppliedCouponDetails {
    couponCode: string;
    couponId: number;
    appliedDiscount: string;
}
interface UserInfo {
    id: string;
    email: string;
    name: string;
}
interface GuestAccount {
    guest_id: number;
}
export declare enum BookingStatus {
    PENDING = 0,
    CONFIRMED = 1,
    BOOKED = 2,
    CANCELLED = 3,
    FAILED = 4,
    DATES_NOT_AVAILABLE = 5,
    DEPOSIT = 6,
    INPROGRESS = 9
}
export declare enum PaymentMethod {
    CARD = "card",
    COUPON = "coupon",
    COMBINED = "combined"
}
export declare enum PayMode {
    CASH = "cash",
    COUPON = "coupon",
    LP = "lp",
    TC = "tc"
}
export declare enum FailureReason {
    PAYMENT = 1,
    SUPPLIER_API = 2,
    INSUFFICIENT_TC = 3,
    INSUFFICIENT_LP = 4,
    OTHER = 5
}
export declare enum BookingFrom {
    WEB = "web",
    MOBILE = "mobile"
}
export declare enum JourneyType {
    ONEWAY = "oneway",
    ROUNDTRIP = "roundtrip",
    MULTI_CITY = "multi-city"
}
export declare class Booking extends BaseEntity {
    booking_id: string;
    booking_reference_id: string;
    supplier_reference_id: string;
    legacy_booking_id: number;
    search_id: string;
    booking_date: Date;
    user_id: string;
    account_id: number;
    contact_details: ContactDetails;
    supplier_name: string;
    reference_id: string;
    module_type: number;
    guest_name: string;
    guest_account_id: GuestAccount[];
    item_id: number;
    sub_item_id: number;
    booking_status: BookingStatus;
    gateway_name: string;
    transaction_id: string;
    payment_method: PaymentMethod;
    pay_mode: PayMode[];
    destination_country: string[];
    destination_city: string[];
    destination_code: string[];
    origin_country: string[];
    origin_city: string[];
    origin_code: string[];
    checkin: Date;
    checkout: Date;
    failure_reason: FailureReason;
    booking_from: BookingFrom;
    journey_type: JourneyType;
    number_of_nights: number;
    paxes: PaxGroup[];
    is_verified: boolean;
    mwr_log_id: string;
    total: number;
    public_price: number;
    net_price: number;
    cash_amount: number;
    tax: number;
    currency_code: string;
    live_currency_rate: number;
    discounts: Discounts;
    savings_amount: number;
    savings_percentage: number;
    applied_coupon_details: AppliedCouponDetails;
    applied_lp: number;
    applied_tc: number;
    is_refundable: boolean;
    created_at: Date;
    updated_at: Date;
    created_by: UserInfo;
    updated_by: UserInfo;
    bookingAdditionalDetails: BookingAdditionalDetail;
}
export {};
