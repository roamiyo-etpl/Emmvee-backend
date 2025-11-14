export declare class TboHotelRoomContentEntity {
    id: string;
    hotelCode: string;
    supplierCode: string;
    roomCode: string;
    isParentRoom: boolean;
    minPax: number;
    maxPax: number;
    maxAdults: number;
    maxChildren: number;
    minAdults: number;
    description: string;
    typeCode: string;
    typeDescription: string;
    characteristicCode: string;
    characteristicDescription: string;
    roomFacilities: [];
    roomStays: [];
    pmsRoomCode: string;
    createdAt: Date;
    updatedAt: Date;
}
