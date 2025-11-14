import { RevalidateDto } from './dtos/revalidate.dto';
import { RevalidateResponse } from './interfaces/revalidate.interface';
import { ProviderRevalidateService } from '../providers/provider-revalidate.service';
export declare class RevalidateService {
    private readonly providerRevalidateService;
    constructor(providerRevalidateService: ProviderRevalidateService);
    revalidate(revalidateDto: RevalidateDto, headers: Headers): Promise<RevalidateResponse>;
}
