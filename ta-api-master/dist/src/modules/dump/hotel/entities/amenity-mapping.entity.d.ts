import { AmenityMasterEntity } from './amenity-master.entity';
export declare class AmenityMappingEntity {
    amenityMappingId: string;
    amenityId: string;
    code: string;
    title: string;
    titleEnglish: string;
    supplierCode: string;
    groupCode: string;
    createdAt: Date;
    updatedAt: Date;
    amenityMaster: AmenityMasterEntity;
}
