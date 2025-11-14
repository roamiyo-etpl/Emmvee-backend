export declare class HotelDetailRequestDto {
    hotelId: string;
    supplierCode: string;
}
export declare class HotelRatingDto {
    stars: number;
    reviewScore: string;
}
export declare class HotelGeolocationDto {
    latitude: string;
    longitude: string;
}
export declare class HotelDetailResponseDto {
    hotelId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    description: string;
    rating: HotelRatingDto;
    geolocation: HotelGeolocationDto;
    images: string[];
    amenities: string[];
    poi: string[];
    neighbourhoods: string[];
}
