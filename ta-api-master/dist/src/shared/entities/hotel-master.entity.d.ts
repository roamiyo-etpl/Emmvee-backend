export declare enum StarRatingEnum {
    ONE = "1",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
    SIX = "6",
    SEVEN = "7"
}
export declare enum HotelSourceEnum {
    DMC = "dmc",
    EXTRANET = "extranet",
    TBO = "tbo",
    HOTELBEDS = "hotelbeds"
}
export declare class HotelMasterEntity {
    hotelMasterId: string;
    hotelName: string;
    highlightText: string;
    starRating: StarRatingEnum;
    countryCode: string;
    city: string;
    state: string;
    address: string;
    address1: string | null;
    postalCode: string;
    latitude: number;
    longitude: number;
    heroImage: string;
    hotelSource: HotelSourceEnum;
    hotelCode: string;
    providerCode: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: {
        id: string;
        email: string;
        name: string;
    };
    updatedBy: {
        id: string;
        email: string;
        name: string;
    };
}
