import { HotelResult } from '../search/interfaces/initiate-result-response.interface';
import { HotelbedsSearchService } from './hotelbeds/hotelbeds-search.service';
import { TboSearchService } from './tbo/tbo-search.service';
export declare class ProvidersSearchService {
    private hotelbedsSearchService;
    private tboSearchService;
    constructor(hotelbedsSearchService: HotelbedsSearchService, tboSearchService: TboSearchService);
    searchInitiate(searchReq: any, headers: Headers): Promise<HotelResult[]>;
}
