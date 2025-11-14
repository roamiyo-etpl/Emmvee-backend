import { TboAuthTokenService } from "./tbo-auth-token.service";
export declare class TboCancellationService {
    private readonly tboAuthTokenService;
    constructor(tboAuthTokenService: TboAuthTokenService);
    cancelRequest(cancelRequest: any, providerCredentials: any, headers: any): Promise<any>;
    private getAuthToken;
    private executeQuoteWithRetry;
}
