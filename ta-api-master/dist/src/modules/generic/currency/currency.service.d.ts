import { CurrencyRepository } from './currency.repository';
export declare class CurrencyService {
    private readonly currencyRepo;
    constructor(currencyRepo: CurrencyRepository);
    updateCurrencyData(): Promise<void>;
    private generateCurrencyJsonFile;
}
