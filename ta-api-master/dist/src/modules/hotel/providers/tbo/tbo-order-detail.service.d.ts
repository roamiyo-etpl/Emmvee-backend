import { TboAuthTokenService } from "./tbo-auth-token.service";
export declare class TboOrderDetailService {
    private readonly tboAuthTokenService;
    constructor(tboAuthTokenService: TboAuthTokenService);
    orderDetail(orderRequest: any, providerCredentials: any, headers: any): Promise<any>;
    private executeQuoteWithRetry;
}
