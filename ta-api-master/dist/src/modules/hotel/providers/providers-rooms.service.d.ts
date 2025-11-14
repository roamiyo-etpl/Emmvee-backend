import { HotelRoomResponse } from '../room/interfaces/room-list-response.interface';
import { HotelRoomQuoteResponse } from '../room/interfaces/room-quote-response.interface';
import { TboRoomService } from './tbo/tbo-room.service';
export declare class ProviderRoomsService {
    private readonly tboRoomService;
    constructor(tboRoomService: TboRoomService);
    searchRoom(roomReq: any, headers: Headers): Promise<HotelRoomResponse>;
    searchRoomQuote(roomQuoteReq: any, headers: Headers): Promise<HotelRoomQuoteResponse>;
}
