import { GenericCancelDto } from '../dto/cancel.dto';
export declare class CancelResponse {
    success: boolean;
    message: string;
    mode: string;
    cancellationStatus?: boolean | string;
    cancellationCharge?: number;
    refundedAmount?: number;
    status?: string;
    remarks?: string;
    creditNoteNo?: string;
    creditNoteCreatedOn?: string;
    error?: {
        errorCode: number;
        errorMessage: string;
    };
}
export declare class CancellationStatusResponse {
    changeRequestId: number;
    refundedAmount: number;
    cancellationCharge: number;
    refundAmount: number;
    status: string;
    remarks?: string;
    currency: string;
    provider: string;
}
export interface CancelRequest {
    cancelReq: GenericCancelDto;
    headers: any;
}
export declare class CancellationChargesResponse {
    success: boolean;
    supplierResponseStatus: string;
    refundAmount: number;
    cancellationCharge: number;
    remarks: string;
    currency: string;
    traceId?: string;
    error?: {
        errorCode: number;
        errorMessage: string;
    };
}
