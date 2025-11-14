import { StartRoutingDto } from '../search/dtos/start-routing.dto';
import { CheckRoutingDto } from '../search/dtos/check-routing.dto';
import { ConfigurationService } from '../configuration/configuration.service';
import { GenericRepo } from 'src/shared/utilities/flight/generic-repo.utility';
import { StartRoutingResponse, Route } from '../search/interfaces/start-routing.interface';
import { CheckRoutingResponse } from '../search/interfaces/check-routing.interface';
import { ProviderRepoService } from './provider-repo.service';
import { TboSearchService } from './tbo/tbo-search.service';
export declare class ProviderSearchService {
    private readonly configService;
    private readonly genericRepo;
    private readonly providerRepoService;
    private readonly tboSearchService;
    constructor(configService: ConfigurationService, genericRepo: GenericRepo, providerRepoService: ProviderRepoService, tboSearchService: TboSearchService);
    providerSearch(searchReq: StartRoutingDto, headers: Headers): Promise<StartRoutingResponse>;
    providerCheckRouting(searchReq: CheckRoutingDto): Promise<CheckRoutingResponse>;
    deduplicationFilter(allResult: StartRoutingResponse | Array<{
        response: string;
    }>, type: 'startRouting' | string): Route[];
}
