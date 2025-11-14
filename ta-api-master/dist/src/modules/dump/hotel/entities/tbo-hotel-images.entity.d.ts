import { TboHotelAdditionalDetailsEntity } from './tbo-hotel-additional-details.entity';
export declare class TboHotelImagesEntity {
    id: string;
    hotelCode: string;
    supplierCode: string;
    typeCode: string;
    typeName: string;
    roomCode: string;
    roomType: string;
    url: string;
    order: number;
    visualOrder: number;
    createdAt: Date;
    updatedAt: Date;
    hotel: TboHotelAdditionalDetailsEntity;
}
