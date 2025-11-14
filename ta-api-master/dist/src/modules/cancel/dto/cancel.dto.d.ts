export declare enum CancelMode {
    Flight = "flight",
    Hotel = "hotel"
}
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
export declare class SectorDto {
    origin: string;
    destination: string;
}
export declare class SupplierParamsDto {
    remarks?: string;
    cancellationType?: string;
    ticketIds?: number[];
    sectors?: SectorDto[];
    releasePnr?: boolean;
    providerCode?: string;
}
export declare class GenericCancelDto {
    mode: CancelMode;
    bookingId: number;
    requestType: string;
    supplierParams?: SupplierParamsDto;
}
export declare class GenericGetCancellationChargesDto {
    mode: CancelMode;
    bookingId: number;
    requestType: string;
}
