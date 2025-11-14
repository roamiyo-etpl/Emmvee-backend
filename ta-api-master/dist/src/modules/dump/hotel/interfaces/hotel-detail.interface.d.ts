export interface HotelRating {
    stars: number;
    reviewScore: string;
}
export interface HotelLocation {
    geoLocation: HotelGeoLocation;
    city: string;
    state: string;
    country: string;
    countryCode: string;
}
export interface HotelAmenity {
    code: string;
    title: string;
    isPaid: boolean;
}
export interface HotelGeoLocation {
    latitude: string;
    longitude: string;
}
export interface HotelPoi {
    name: string;
    distance: string;
}
export interface HotelNeighbourhood {
    name: string;
    type: string;
    distance: string;
}
export interface HotelImageSizes {
    thumbnail: string;
    small: string;
    standard: string;
    bigger: string;
    xl: string;
    xxl: string;
    original: string;
}
export interface HotelDetailResponse {
    hotelId: string;
    name: string;
    address: string;
    phones: string[];
    description: string;
    rating: HotelRating;
    location: HotelLocation;
    images: HotelImageSizes[];
    amenities: HotelAmenity[];
    poi: HotelPoi[];
    neighbourhoods: HotelNeighbourhood[];
}
