import { RevalidateDto } from '../revalidate/dtos/revalidate.dto';
import { RevalidateResponse } from '../revalidate/interfaces/revalidate.interface';
import { ConfigurationService } from '../configuration/configuration.service';
import { TboRevalidateService } from './tbo/tbo-revalidate.service';
export declare class ProviderRevalidateService {
    private configService;
    private tboRevalidateService;
    constructor(configService: ConfigurationService, tboRevalidateService: TboRevalidateService);
    providerRevalidate(revalidateReq: RevalidateDto, headers: Headers): Promise<RevalidateResponse>;
    singleRevalidation(revalidateRequest: any): any;
    multiRevalidation(revalidateRequest: any): Promise<any>;
}
