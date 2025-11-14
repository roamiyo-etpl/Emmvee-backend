import { BaseEntity } from 'typeorm';
interface UserInfo {
    id: string;
    email: string;
    name: string;
}
export declare class FrontendModule extends BaseEntity {
    frontend_module_id: number;
    title: string;
    is_active: boolean;
    is_module: boolean;
    updated_at: Date;
    updated_by: UserInfo;
}
export {};
