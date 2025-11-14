import { HotelRoomResponse } from '../../room/interfaces/room-list-response.interface';
import { HotelRoomQuoteResponse } from '../../room/interfaces/room-quote-response.interface';
import { TboRepository } from './tbo.repository';
import { TboHotelImagesEntity } from 'src/modules/dump/hotel/entities/tbo-hotel-images.entity';
import { Repository } from 'typeorm';
import { TboHotelAdditionalDetailsEntity } from 'src/modules/dump/hotel/entities/tbo-hotel-additional-details.entity';
export declare class TboRoomService {
    private readonly hotelImagesRepository;
    private readonly hotelDetailsRepository;
    private readonly tboRepository;
    constructor(hotelImagesRepository: Repository<TboHotelImagesEntity>, hotelDetailsRepository: Repository<TboHotelAdditionalDetailsEntity>, tboRepository: TboRepository);
    searchRooms(roomRequest: any, providerCredentials: any): Promise<HotelRoomResponse>;
    searchRoomQuote(quoteRequest: any, providerCredentials: any): Promise<HotelRoomQuoteResponse>;
    private createTboRoomSearchRequest;
    private executeRoomSearchWithRetry;
    private executeQuoteWithRetry;
    private convertTboRoomResponseToStandard;
    private convertTboQuoteResponseToStandard;
    private fetchHotelImages;
    private fetchHotelAdditionalDetails;
}
