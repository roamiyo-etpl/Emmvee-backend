import { ConfigurationService } from '../../configuration/configuration.service';
export declare class TboAuthTokenService {
    private readonly configurationService;
    constructor(configurationService: ConfigurationService);
    getAuthToken(searchRequest: any): Promise<any>;
    getNewAuthToken(searchRequest: any): Promise<any>;
}
