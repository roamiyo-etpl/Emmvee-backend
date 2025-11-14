import { Repository } from 'typeorm';
import { CurrencyConversionEntity } from '../../../shared/entities/currency-rate.entity';
export declare class CurrencyRepository {
    private readonly currencyRepo;
    constructor(currencyRepo: Repository<CurrencyConversionEntity>);
    getCurrencyData(): Promise<CurrencyConversionEntity[]>;
    addCurrencyData(currencies: any): Promise<CurrencyConversionEntity[]>;
    upsertUsdBaseRatesFromResponse(currencyResponse: any[]): Promise<number>;
}
