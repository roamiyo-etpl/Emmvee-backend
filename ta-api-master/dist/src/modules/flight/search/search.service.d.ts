import { ProviderSearchService } from '../providers/provider-search.service';
import { CheckRoutingDto } from './dtos/check-routing.dto';
import { StartRoutingDto } from './dtos/start-routing.dto';
import { StartRoutingResponse } from './interfaces/start-routing.interface';
import { CheckRoutingResponse } from './interfaces/check-routing.interface';
export declare class SearchService {
    private readonly providerSearchService;
    constructor(providerSearchService: ProviderSearchService);
    startRouting(searchReq: StartRoutingDto, headers: Headers): Promise<StartRoutingResponse>;
    collectivePolling(searchReq: CheckRoutingDto): Promise<CheckRoutingResponse>;
}
