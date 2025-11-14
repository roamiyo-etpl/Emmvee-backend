import { CancelResponse } from 'src/modules/cancel/interfaces/cancel.interface';
import { ConfigurationService } from '../configuration/configuration.service';
import { TboCancellationService } from './tbo/tbo-cancellation.service';
export declare class ProviderCancellationService {
    private configService;
    private tboCancellationService;
    constructor(configService: ConfigurationService, tboCancellationService: TboCancellationService);
    providerCancel(reqParams: any): Promise<CancelResponse>;
    providerCancellationCharges(reqParams: any): Promise<import("src/modules/cancel/interfaces/cancel.interface").CancellationChargesResponse>;
}
