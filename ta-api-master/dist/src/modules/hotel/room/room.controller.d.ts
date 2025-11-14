import { HotelRoomService } from './room.service';
import { HotelRoomListRequestDto } from './dtos/hotel-room-list.dto';
import { HotelRoomResponse } from './interfaces/room-list-response.interface';
import { HotelRoomQuoteDto } from './dtos/hotel-room-quote.dto';
import { HotelRoomQuoteResponse } from './interfaces/room-quote-response.interface';
export declare class HotelRoomController {
    private readonly roomService;
    constructor(roomService: HotelRoomService);
    getRoomList(hotelRoomListRequestDto: HotelRoomListRequestDto, headers: any): Promise<HotelRoomResponse>;
    getRoomQuote(hotelRoomQuotedto: HotelRoomQuoteDto, headers: any): Promise<HotelRoomQuoteResponse>;
}
