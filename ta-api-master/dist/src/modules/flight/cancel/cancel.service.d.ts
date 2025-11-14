import { ProviderCancellationService } from '../providers/provider-cancellation.service';
import { CancelResponse } from 'src/modules/cancel/interfaces/cancel.interface';
import { CancelRepository } from './cancel.repository';
export declare class CancelService {
    private readonly providerCancellationService;
    private readonly cancelRepository;
    constructor(providerCancellationService: ProviderCancellationService, cancelRepository: CancelRepository);
    cancelFlight(reqParams: any): Promise<CancelResponse>;
    getCancellationCharges(reqParams: any): Promise<import("src/modules/cancel/interfaces/cancel.interface").CancellationChargesResponse>;
    private validateCancelRequest;
}
