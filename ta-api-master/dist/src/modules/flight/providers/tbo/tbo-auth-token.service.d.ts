import { ConfigurationService } from '../../configuration/configuration.service';
import { s3BucketService } from 'src/shared/utilities/flight/s3bucket.utility';
import { SupplierLogUtility } from 'src/shared/utilities/flight/supplier-log.utility';
export declare class TboAuthTokenService {
    private readonly configurationService;
    private readonly s3BucketService;
    private readonly supplierLogUtility;
    constructor(configurationService: ConfigurationService, s3BucketService: s3BucketService, supplierLogUtility: SupplierLogUtility);
    getAuthToken(searchRequest: any): Promise<any>;
    getNewAuthToken(searchRequest: any): Promise<any>;
}
