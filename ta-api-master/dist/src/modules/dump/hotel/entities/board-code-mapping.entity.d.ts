import { BoardCodeMasterEntity } from './board-code-master.entity';
export declare class BoardCodeMappingEntity {
    boardCodeMappingId: string;
    boardCodeId: string;
    supplierCode: string;
    boardCode: string;
    supplierTitle: string;
    titleEnglish: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: {
        id: string;
        name: string;
        email: string;
    };
    updatedBy: {
        id: string;
        name: string;
        email: string;
    };
    boardCodeMaster: BoardCodeMasterEntity;
}
