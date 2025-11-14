import { BaseEntity } from 'typeorm';
import { CurrencyPlacementEnum } from '../enums/common.enum';
export declare class CurrencyConversionEntity extends BaseEntity {
    id: number;
    name: string;
    symbol: string;
    code: string;
    baseRateUSD: number;
    symbolPlacement: CurrencyPlacementEnum;
    countries: string;
    isActive: boolean;
    isDeleted: boolean;
    updatedAt: Date;
    updateTimestamp(): void;
}
