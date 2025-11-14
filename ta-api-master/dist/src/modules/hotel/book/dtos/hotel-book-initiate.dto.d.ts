import { GenderEnum, TitleEnum } from 'src/shared/enums/accounts.enum';
export declare class PassengerDto {
    type: 'adult' | 'child' | 'infant';
    title: string;
    roomId: number;
    age?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    dob?: string;
    dialCode?: string;
    mobileNo?: string;
    nationality?: string;
    pan?: string;
    passportNumber?: string;
    passportIssueDate?: string;
    passportExpDate?: string;
    passportIssuingCountry?: string;
}
export declare class PaymentDetailsDto {
    gatewayName: string;
    paymentType: string;
    totalAmount: number;
    cashAmount: number;
    priceHashKey: string;
    paymentToken: string;
    paymentLogId: string;
}
export declare class ContactDetailsDto {
    title: TitleEnum;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: GenderEnum;
    email: string;
    dialCode: string;
    mobileNo: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}
export declare class HotelBookInitiateDto {
    hotelId: string;
    supplierCode: string;
    searchReqId: string;
    rateKey: string;
    checkIn: string;
    checkOut: string;
    passengers: PassengerDto[];
    paymentDetails: PaymentDetailsDto;
    contactDetails: ContactDetailsDto;
}
