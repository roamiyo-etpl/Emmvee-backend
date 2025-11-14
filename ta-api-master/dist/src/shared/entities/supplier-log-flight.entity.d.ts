import { BaseEntity } from 'typeorm';
export declare class SupplierLogFlight extends BaseEntity {
    supplier_log_id: number;
    log_id: string;
    title: string;
    search_req_id: string;
    booking_reference_id: string;
    path_url: string;
    created_at: Date;
}
