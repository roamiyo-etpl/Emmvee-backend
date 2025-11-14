export interface HotelAutocompleteInterface {
    hotelCode: string;
    hotelName: string;
    city: string;
    state: string;
    country: string;
    rating: number;
    address: string;
    heroImage: string;
}
export interface HotelAutocompleteResponse {
    success: boolean;
    message: string;
    data: HotelAutocompleteInterface[];
    totalCount: number;
}
export interface HotelResponse {
    success: boolean;
    message: string;
    data: any;
}
