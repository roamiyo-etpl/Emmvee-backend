import { TboAuthTokenService } from "./tbo-auth-token.service";
export declare class TboBookService {
    private readonly tboAuthTokenService;
    constructor(tboAuthTokenService: TboAuthTokenService);
    bookConfirmation(bookRequest: any, providerCredentials: any, headers: any): Promise<any>;
    private executeQuoteWithRetry;
    private creatingBookRequest;
    private parsePriceHash;
}
