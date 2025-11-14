import { FareRules } from '../../revalidate/interfaces/revalidate.interface';
import { Fare, LocationInfo, Segment } from '../../search/interfaces/start-routing.interface';
export declare class OrderRoutes {
    fare: Fare[];
    fareRules: FareRules[];
    flightStops: number[];
    airlineName?: string[];
    airlineCode: string[];
    departureInfo: LocationInfo[];
    arrivalInfo: LocationInfo[];
    totalDuration: string[];
    totalInterval: string[];
    flightSegments: Segment[];
    isRefundable?: boolean;
    separateRoute?: any;
}
export declare class OrderDetailResponse {
    error: boolean;
    message: string;
    searchReqId: string;
    mode: string;
    bookingRefNumber?: string;
    pnr?: string;
    bookingId?: string;
    ticketNumber?: string;
    ticketId?: string;
    bookingStatus?: string;
    passengers?: OrderDetailPassenger[];
    routes: OrderRoutes;
}
declare class orderDetailPassengerDetail {
    firstName: string;
    lastName: string;
    title: string;
}
declare class orderDocument {
    documentType: string;
    documentNumber: string;
    expiryDate?: string;
    country: string;
}
export declare class OrderDetailPassenger {
    passengerType: string;
    gender: string;
    passengerDetail: orderDetailPassengerDetail;
    dateOfBirth: string;
    document: orderDocument;
    nationality: string;
    mobile: string;
    mobileCountryCode: string;
    ticketId?: string;
}
export {};
