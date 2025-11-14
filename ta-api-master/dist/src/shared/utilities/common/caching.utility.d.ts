import { Cacheable } from 'cacheable';
import { CacheResponse } from 'src/shared/interfaces/cache-response.interface';
export declare class CachingUtility {
    private readonly client;
    constructor(client: Cacheable);
    getCachedData(searchRequest: any, providersName: string, type?: null): Promise<CacheResponse>;
    getPollingData(hashKey: string): Promise<CacheResponse>;
    setCachedData(requestData: any, providersName: string, data: string, type: string): Promise<CacheResponse>;
    createHotelKey(searchReq: any, providersName: string): string;
    createHotelRevalidateKey(providerRes: any, providersName: string): string;
    setCachedDataBySearchReqId(searchReqId: string, searchResponse: any): Promise<CacheResponse>;
    getCachedDataBySearchReqId(searchReqId: string): Promise<CacheResponse>;
    listCacheKeys(pattern?: string): Promise<string[]>;
}
