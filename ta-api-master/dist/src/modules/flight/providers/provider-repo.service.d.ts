import { SearchResponse } from 'src/shared/entities/search-response.entity';
import { Repository } from 'typeorm';
import { StartRoutingResponse } from '../search/interfaces/start-routing.interface';
export declare class ProviderRepoService {
    private searchResponseRepo;
    constructor(searchResponseRepo: Repository<SearchResponse>);
    storeSearchResponse(data: StartRoutingResponse, providerName?: string): Promise<SearchResponse>;
    updateProviderCount(searchReqId: any, count: any): Promise<import("typeorm").UpdateResult>;
    getAllResponseByID(data: any): Promise<SearchResponse[]>;
    deleteSearchResult(searchReqId: any): Promise<import("typeorm").DeleteResult>;
    getSearchResponseByID(data: any): Promise<SearchResponse | null>;
}
