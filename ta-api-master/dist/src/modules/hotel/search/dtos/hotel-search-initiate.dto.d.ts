import { ApiEnvironment, Channel, HotelSearchBy, HotelSearchType, RadiusUnit, SortOrder } from 'src/shared/enums/hotel/hotel.enum';
export declare class RoomDto {
    adults: number;
    children: number;
    childAges: number[];
}
export declare class GeoLocationDto {
    latitude: number;
    longitude: number;
}
export declare class LocationDto {
    geoLocation: GeoLocationDto;
    placeId?: string | null;
    searchKeyword: string;
    country: string;
    city: string;
    radius: number;
    radiusUnit: RadiusUnit;
    hotelId: number;
}
export declare class SearchCriteriaDto {
    checkIn: string;
    checkOut: string;
    rooms: RoomDto | RoomDto[];
    location: LocationDto;
}
export declare class SearchMetaDataDto {
    guestNationality: string;
    searchType: HotelSearchType;
    market: string;
    channel: Channel;
}
export declare class SearchSettingDto {
    apiEnvironment: ApiEnvironment;
    refundableOnly?: boolean;
    pageLimit: number;
}
export declare class SortDto {
    by: HotelSearchBy;
    order: SortOrder;
}
export declare class HotelSearchInitiateDto {
    searchCriteria: SearchCriteriaDto;
    searchMetadata: SearchMetaDataDto;
    searchSetting: SearchSettingDto;
    sort: SortDto;
}
