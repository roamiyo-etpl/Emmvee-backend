import { StatusEnum } from '../enums/accounts.enum';
interface UserInfo {
    id: string;
    name: string;
    email: string;
}
export declare class Airline {
    id: number;
    code: string;
    name: string;
    web_checkin_url: string;
    status: StatusEnum;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    created_by: UserInfo;
    updated_by: UserInfo;
}
export {};
