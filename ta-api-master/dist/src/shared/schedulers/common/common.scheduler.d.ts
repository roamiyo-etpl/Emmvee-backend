import { CurrencyService } from '../../../modules/generic/currency/currency.service';
export declare class CommonScheduler {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    updateCurrencyConversion(): Promise<void>;
}
