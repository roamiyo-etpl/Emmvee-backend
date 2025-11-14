export declare class RouteDetails {
    airline: string;
    departureCode: string;
    departureDate: string;
    departureTime: string;
    arrivalCode: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNum: string;
    bookingCode: string;
}
export declare class PaxesInfo {
    adult: number;
    children: number;
    infant: number;
}
export declare class GroupHash {
    provider: string;
    netAmount: number;
    solutionId: string;
}
export declare class RevalidateDto {
    solutionId: string;
    searchReqId: string;
    trackingId: string;
    providerCode: string;
    airTripType: string;
    cabinClass: string;
    isMultiReValid?: boolean;
    groupHash?: GroupHash[];
    paxes: PaxesInfo[];
    routes: RouteDetails[][];
}
