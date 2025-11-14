import { RoomDto, SearchMetaDataDto } from '../../search/dtos/hotel-search-initiate.dto';
export declare class HotelRoomListRequestDto {
    hotelId: string;
    searchReqId: string;
    supplierCode: string;
    checkIn: string;
    checkOut: string;
    rooms: RoomDto[];
    searchMetadata: SearchMetaDataDto;
}
