import { ApiEnvironment } from 'src/shared/enums/hotel/hotel.enum';
import { SortDto } from './hotel-search-initiate.dto';
export declare class PaginationDto {
    page: number;
    limit: number;
}
export declare class FiltersDto {
    priceRange?: [number, number] | string[];
    starRating: number[];
    amenities: string[];
    mealTypes: string[];
    neighborhoods: string[];
    poi: string[];
    cancellation: string[];
    hotelNames: string[];
}
export declare class HotelSearchFiltrationDto {
    searchReqId: string;
    apiEnvironment: ApiEnvironment;
    sort: SortDto;
    pagination: PaginationDto;
    filters: FiltersDto;
}
