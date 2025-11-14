export declare enum RequestType {
    FullCancellation = 1,
    PartialCancellation = 2,
    Reissuance = 3
}
export declare enum CancellationType {
    NotSet = 0,
    NoShow = 1,
    FlightCancelled = 2,
    Others = 3
}
export declare enum CancellationStatus {
    NotSet = 0,
    Unassigned = 1,
    Assigned = 2,
    Acknowledged = 3,
    Completed = 4,
    Rejected = 5,
    Closed = 6,
    Pending = 7,
    Other = 8
}
export declare class CancelFlightDto {
    bookingId: number;
    requestType: string;
    remarks?: string;
    cancellationType?: string;
    ticketIds?: number[];
    sectors?: SectorDto[];
    releasePnr?: boolean;
}
export declare class SectorDto {
    origin: string;
    destination: string;
}
export declare class ReleasePNRRequestDto {
    EndUserIp: string;
    TokenId: string;
    BookingId: number;
    Source: string;
}
export declare class ReleasePNRResponseDto {
    TraceId: string;
    ResponseStatus: number;
    Error?: {
        ErrorCode: number;
        ErrorMessage: string;
    };
}
export declare class SendChangeRequestDto {
    EndUserIp: string;
    TokenId: string;
    BookingId: number;
    RequestType: number;
    CancellationType: number;
    TicketId?: number[] | string;
    Remarks?: string;
    Sectors?: Array<{
        Origin: string;
        Destination: string;
    }>;
}
export declare class SendChangeResponseDto {
    B2B2BStatus: boolean;
    TicketCRInfo: Array<{
        ChangeRequestId: number;
        TicketId: number;
        Status: number;
        Remarks: string;
        ChangeRequestStatus?: number;
        CancellationCharge?: number;
        RefundedAmount?: number;
        ServiceTaxOnRAF?: number;
        SwachhBharatCess?: number;
        KrishiKalyanCess?: number;
        CreditNoteNo?: string;
        CreditNoteCreatedOn?: string;
    }>;
    ResponseStatus: number;
    TraceId: string;
    Error?: {
        ErrorCode: number;
        ErrorMessage: string;
    };
}
export declare class GetChangeRequestStatusRequestDto {
    EndUserIp: string;
    TokenId: string;
    ChangeRequestId: number;
}
export declare class GetChangeRequestStatusResponseDto {
    ResponseStatus: number;
    TraceId: string;
    Error?: {
        ErrorCode: number;
        ErrorMessage: string;
    };
    ChangeRequestId: number;
    RefundedAmount: number;
    CancellationCharge: number;
    ServiceTaxOnRAF: number;
    ChangeRequestStatus: number;
}
export declare class GetCancellationChargesRequestDto {
    EndUserIp: string;
    TokenId: string;
    RequestType: number;
    BookingId: number;
    BookingMode?: number;
}
export declare class GetCancellationChargesDto {
    bookingId: number;
    requestType: string;
}
export declare class GetCancellationChargesResponseDto {
    ResponseStatus: number;
    TraceId: string;
    RefundAmount: number;
    CancellationCharge: number;
    Remarks: string;
    Currency: string;
    Error?: {
        ErrorCode: number;
        ErrorMessage: string;
    };
}
