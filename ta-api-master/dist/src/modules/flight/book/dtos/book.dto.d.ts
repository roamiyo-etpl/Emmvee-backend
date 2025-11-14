export declare class RouteDetails {
    airline: string;
    departureCode: string;
    departureDate: string;
    departureTime: string;
    arrivalCode: string;
    arrivalDate: string;
    arrivalTime: string;
    bookingCode: string;
    flightNum: string;
}
export declare class Document {
    documentType: string;
    documentNumber: string;
    expiryDate: string;
    country: string;
}
export declare class PassengerDetail {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
}
export declare class Passenger {
    passengerType: string;
    gender: string;
    passengerDetail: PassengerDetail;
    dateOfBirth: string;
    document?: Document;
    nationality: string;
    mobile: string;
    mobileCountryCode: string;
}
export declare class ContactInfo {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    email: string;
    mobile: string;
    mobileCountryCode: string;
    postalCode: string;
}
export declare class GSTDetails {
    gstCompanyAddress?: string;
    gstCompanyContactNumber?: string;
    gstCompanyName?: string;
    gstNumber?: string;
    gstCompanyEmail?: string;
}
export declare class BookDto {
    solutionId: string;
    searchReqId: string;
    trackingId: string;
    providerCode: string;
    fareType: string;
    airTripType: string;
    airlineType: string;
    passengers: Passenger[];
    contact: ContactInfo;
    routes: RouteDetails[][];
    gst?: GSTDetails;
}
export declare class BookConfirmationDto {
    bookingId: string;
    bookingLogId: string;
}
