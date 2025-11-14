import { StatusEnum } from '../enums/accounts.enum';
interface UserInfo {
    id: string;
    name: string;
    email: string;
}
export declare class Airports {
    id: number;
    code: string;
    latitude: string;
    longitude: string;
    name: string;
    city: string;
    state: string;
    country: string;
    icao: string;
    woeid: string;
    tz: string;
    phone: string;
    type: string;
    email: string;
    url: string;
    runway_length: string;
    elev: string;
    direct_flights: string;
    carriers: string;
    timezone: string;
    status: StatusEnum;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    created_by: UserInfo;
    updated_by: UserInfo;
}
export {};
