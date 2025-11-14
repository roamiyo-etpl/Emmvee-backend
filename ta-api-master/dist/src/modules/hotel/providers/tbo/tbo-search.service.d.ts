import { HotelResult } from '../../search/interfaces/initiate-result-response.interface';
import { TboRepository } from './tbo.repository';
import { Repository } from 'typeorm';
import { TboHotelAdditionalDetailsEntity } from 'src/modules/dump/hotel/entities/tbo-hotel-additional-details.entity';
import { TboHotelImagesEntity } from 'src/modules/dump/hotel/entities/tbo-hotel-images.entity';
export declare class TboSearchService {
    private readonly hotelDetailsRepository;
    private readonly hotelImagesRepository;
    private readonly tboRepository;
    constructor(hotelDetailsRepository: Repository<TboHotelAdditionalDetailsEntity>, hotelImagesRepository: Repository<TboHotelImagesEntity>, tboRepository: TboRepository);
    search(searchRequest: any, providerCredentials: any): Promise<HotelResult[]>;
    private getHotelDataByLocation;
    private createTboSearchRequest;
    private executeSearchWithRetry;
    private makeAuthenticatedRequest;
    private handleRequestError;
    private convertTboResponseToHotelResult;
    private createHotelResultFromTboData;
    private calculateNights;
    private fetchHotelAdditionalDetails;
    private fetchHotelImages;
}
