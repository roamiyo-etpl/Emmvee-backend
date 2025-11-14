import { Repository } from 'typeorm';
import { HotelMasterEntity } from 'src/shared/entities/hotel-master.entity';
export declare class TboRepository {
    private readonly hotelMasterRepo;
    constructor(hotelMasterRepo: Repository<HotelMasterEntity>);
    findHotelsByCity(cityName: string): Promise<HotelMasterEntity[]>;
    findHotelsByCityId(cityId: string): Promise<HotelMasterEntity[]>;
    findHotelsByHotelCode(hotelCodes: string[]): Promise<HotelMasterEntity[]>;
    findHotelDetailsByHotelCode(hotelCode: string): Promise<HotelMasterEntity | null>;
    findHotelsByMap(map: {
        lat: number;
        lng: number;
    }, radiusInKm?: number): Promise<HotelMasterEntity[]>;
    findHotelByCode(hotelCode: string): Promise<HotelMasterEntity | null>;
    findHotelsByName(hotelName: string): Promise<HotelMasterEntity[]>;
    findHotelsByCoordinates(coordinates: {
        lat: number;
        lng: number;
    }, radiusKm?: number): Promise<HotelMasterEntity[]>;
}
