export declare class SearchAirLegs {
    departureDate: string;
    origin: string;
    destination: string;
}
export declare class TravelPreference {
    maxStopsQuantity: number;
    cabinClass: string;
    airTripType: string;
    nearByAirports?: boolean;
}
export declare class Paxes {
    type: string;
    quantity: number;
}
export declare class StartRoutingDto {
    searchAirLegs: SearchAirLegs[];
    travelPreferences: TravelPreference[];
    paxes: Paxes[];
}
