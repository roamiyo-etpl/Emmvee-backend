export declare class SearchAirLegs {
    origin: string;
    destination: string;
    departureDate: string;
}
declare class BookingDetails {
    orderStatus: number;
    pnr: string;
    orderNo: string;
    firstName: string;
    lastName: string;
}
export declare class OrderDetailDto {
    providerCode: string;
    bookingDetails: BookingDetails[];
    searchReqId: string;
    searchAirLegs: SearchAirLegs[];
    mode: string;
}
export {};
