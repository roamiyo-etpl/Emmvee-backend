export declare class RoomBookingInfoDto {
    rateKey: string;
    rooms?: number;
    adults?: number;
    children?: number;
    childAges?: number[];
}
export declare class HotelRoomQuoteDto {
    hotelId?: string;
    searchReqId: string;
    supplierCode: string;
    roomBookingInfo: RoomBookingInfoDto[];
}
