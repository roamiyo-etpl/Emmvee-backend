import { ProviderBalanceService } from '../providers/provider-balance.service';
import { BalanceCheckResponse } from './interfaces/balance-response.interface';
import { BalanceCheckDto } from './dtos/balance-check.dto';
export declare class BalanceCheckService {
    private readonly providerBalanceService;
    constructor(providerBalanceService: ProviderBalanceService);
    checkBalance(balanceReq: BalanceCheckDto): Promise<BalanceCheckResponse>;
}
