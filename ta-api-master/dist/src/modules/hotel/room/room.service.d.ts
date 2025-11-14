import { ProviderRoomsService } from '../providers/providers-rooms.service';
import { HotelRoomResponse } from './interfaces/room-list-response.interface';
import { HotelRoomListRequestDto } from './dtos/hotel-room-list.dto';
import { HotelRoomQuoteDto } from './dtos/hotel-room-quote.dto';
import { HotelRoomQuoteResponse } from './interfaces/room-quote-response.interface';
import { SupplierCredService } from 'src/modules/generic/supplier-credientials/supplier-cred.service';
export declare class HotelRoomService {
    private readonly providerRoomsService;
    private supplierCred;
    private readonly logger;
    constructor(providerRoomsService: ProviderRoomsService, supplierCred: SupplierCredService);
    getHotelRoomList(apiReqData: HotelRoomListRequestDto, headers: Headers): Promise<HotelRoomResponse>;
    getHotelRoomQuote(hotelRoomQuoteDto: HotelRoomQuoteDto, headers: any): Promise<HotelRoomQuoteResponse>;
}
