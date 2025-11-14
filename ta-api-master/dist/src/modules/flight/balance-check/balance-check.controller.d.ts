import { BalanceCheckService } from './balance-check.service';
import { BalanceCheckDto } from './dtos/balance-check.dto';
import { BalanceCheckResponse } from './interfaces/balance-response.interface';
export declare class BalanceCheckController {
    private readonly balanceCheckService;
    constructor(balanceCheckService: BalanceCheckService);
    balanceCheck(balanceReq: BalanceCheckDto): Promise<BalanceCheckResponse>;
}
