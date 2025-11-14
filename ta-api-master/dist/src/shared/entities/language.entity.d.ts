import { LanguageType } from '../enums/common.enum';
export declare class LanguageEntity {
    id: number;
    key: string;
    english: string;
    french: string;
    german: string;
    hungarian: string;
    italian: string;
    korean: string;
    portuguese: string;
    romanian: string;
    russian: string;
    spanish: string;
    type: LanguageType;
    isActive: boolean;
    createdAt: Date;
}
