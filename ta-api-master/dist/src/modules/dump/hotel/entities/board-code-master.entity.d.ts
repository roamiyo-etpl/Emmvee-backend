export declare class BoardCodeMasterEntity {
    boardCodeId: string;
    alias: string;
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
}
