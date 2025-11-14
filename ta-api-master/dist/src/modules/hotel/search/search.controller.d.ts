import { HotelSearchInitiateDto } from './dtos/hotel-search-initiate.dto';
import { HotelSearchCheckResultsDto } from './dtos/hotel-search-check-results.dto';
import { HotelSearchFiltrationDto } from './dtos/hotel-search-filtration.dto';
import { SearchService } from './search.service';
import { InitiateResultResponse } from './interfaces/initiate-result-response.interface';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    initiate(hotelSearchInitiateDto: HotelSearchInitiateDto, headers: any): Promise<InitiateResultResponse>;
    checkResults(hotelSearchCheckResultsDto: HotelSearchCheckResultsDto, headers: any): Promise<InitiateResultResponse>;
    filtration(hotelSearchFiltrationDto: HotelSearchFiltrationDto, headers: any): Promise<InitiateResultResponse>;
}
