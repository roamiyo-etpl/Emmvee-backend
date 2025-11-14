export type IsActive = 'Active' | 'Inactive';
export type ProviderMode = 'Test' | 'Production';
export type ModuleType = 'Hotel' | 'Flight';
export declare class ProviderMaster {
    provider_id: number;
    name: string;
    code: string;
    provider_mode: ProviderMode;
    provider_credentials: string;
    is_active: IsActive;
    authToken: string;
    module_type: ModuleType;
    tokenUpdatedAt: string;
    updated_by: number;
    updated_at: string;
}
