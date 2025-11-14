import { Repository } from 'typeorm';
import { ProviderMaster } from 'src/shared/entities/provider-master.entity';
export declare class SupplierCredService {
    private assignedProviderRepo;
    constructor(assignedProviderRepo: Repository<ProviderMaster>);
    getActiveProviders(headers: any): Promise<ProviderMaster[]>;
    getInActiveProviders(clubId: any): Promise<ProviderMaster[]>;
    getProviderConfiguration(supplierCode: any, mode?: any): Promise<ProviderMaster | null>;
}
