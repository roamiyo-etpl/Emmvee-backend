import { SearchService } from './search.service';
import { StartRoutingDto } from './dtos/start-routing.dto';
import { CheckRoutingDto } from './dtos/check-routing.dto';
import { StartRoutingResponse } from './interfaces/start-routing.interface';
import { CheckRoutingResponse } from './interfaces/check-routing.interface';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    startRouting(searchReq: StartRoutingDto, headers: Headers): Promise<StartRoutingResponse>;
    collectivePolling(searchReq: CheckRoutingDto): Promise<CheckRoutingResponse>;
}
