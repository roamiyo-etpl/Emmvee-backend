import { ConfigurationService } from '../configuration/configuration.service';
import { BalanceCheckResponse } from '../balance-check/interfaces/balance-response.interface';
import { BalanceCheckDto } from '../balance-check/dtos/balance-check.dto';
export declare class ProviderBalanceService {
    private readonly configService;
    constructor(configService: ConfigurationService);
    providerBalanceCheck(balanceReq: BalanceCheckDto): Promise<BalanceCheckResponse>;
}
