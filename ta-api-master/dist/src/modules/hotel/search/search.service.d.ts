import { HotelSearchInitiateDto } from './dtos/hotel-search-initiate.dto';
import { HotelSearchCheckResultsDto } from './dtos/hotel-search-check-results.dto';
import { HotelSearchFiltrationDto } from './dtos/hotel-search-filtration.dto';
import { ProvidersSearchService } from '../providers/providers-search.service';
import { InitiateResultResponse } from './interfaces/initiate-result-response.interface';
import { SupplierCredService } from 'src/modules/generic/supplier-credientials/supplier-cred.service';
import { CachingUtility } from 'src/shared/utilities/common/caching.utility';
export declare class SearchService {
    private readonly providersSearchService;
    private supplierCred;
    private cachingUtility;
    private readonly logger;
    constructor(providersSearchService: ProvidersSearchService, supplierCred: SupplierCredService, cachingUtility: CachingUtility);
    searchInitiate(apiReqData: HotelSearchInitiateDto, headers: Headers): Promise<InitiateResultResponse>;
    searchCheckResults(searchCheckResultsRequest: HotelSearchCheckResultsDto, headers: Headers): Promise<InitiateResultResponse>;
    searchFiltration(filtrationRequest: HotelSearchFiltrationDto, headers: Headers): Promise<InitiateResultResponse>;
    private createEmptyResponse;
    private createCompleteResponse;
    private generateFacets;
    private applyFilters;
    private applySorting;
}
