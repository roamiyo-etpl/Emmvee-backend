import { ModuleType, ProviderMaster } from 'src/shared/entities/provider-master.entity';
import { Repository } from 'typeorm';
export declare class ConfigurationService {
    private providerRepository;
    constructor(providerRepository: Repository<ProviderMaster>);
    getActiveProviderList({ module }: {
        module: ModuleType;
    }): Promise<ProviderMaster[]>;
    getConfiguration({ supplierCode, mode, module }: {
        supplierCode: any;
        mode: any;
        module: any;
    }): Promise<ProviderMaster | null>;
    getToken({ searchRequest, module }: {
        searchRequest: any;
        module: any;
    }): Promise<string | undefined>;
    updateAuthToken({ newAuthToken, searchRequest, module }: {
        newAuthToken: any;
        searchRequest: any;
        module: any;
    }): Promise<void>;
    getProviderId(): Promise<any>;
}
