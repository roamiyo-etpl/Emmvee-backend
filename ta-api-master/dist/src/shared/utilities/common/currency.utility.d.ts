import { CurrencyConversionResult } from 'src/shared/interfaces/currency.interface';
export declare class CurrencyUtility {
    static convertCurrency(params: {
        currencyFrom: string;
        currencyTo: string;
        amount: number;
    }): CurrencyConversionResult;
}
