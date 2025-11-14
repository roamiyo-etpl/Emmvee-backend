"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyUtility = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class CurrencyUtility {
    static convertCurrency(params) {
        const { currencyFrom, currencyTo, amount } = params;
        if (typeof amount !== 'number' || !isFinite(amount)) {
            throw new Error('Amount must be a finite number');
        }
        const filePath = (0, path_1.join)(process.cwd(), 'json', 'currency.json');
        const map = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf8'));
        const fromCode = currencyFrom || '';
        const toCode = currencyTo || '';
        const fromIsUSD = fromCode.toUpperCase() === 'USD';
        const toIsUSD = toCode.toUpperCase() === 'USD';
        const fromEntry = fromIsUSD ? null : (map[fromCode] ?? map[fromCode.toUpperCase()]);
        const toEntry = toIsUSD ? null : (map[toCode] ?? map[toCode.toUpperCase()]);
        const fromRate = fromIsUSD ? 1 : Number(fromEntry?.rate);
        const toRate = toIsUSD ? 1 : Number(toEntry?.rate);
        if (!fromIsUSD && (!fromEntry || !isFinite(fromRate) || fromRate <= 0)) {
            throw new Error(`Unsupported or invalid currencyFrom: ${currencyFrom}`);
        }
        if (!toIsUSD && (!toEntry || !isFinite(toRate) || toRate <= 0)) {
            throw new Error(`Unsupported or invalid currencyTo: ${currencyTo}`);
        }
        const rate = toRate / fromRate;
        const convertedAmount = amount * rate;
        return {
            rate,
            convertedAmount: Number(convertedAmount.toFixed(2)),
            currencyFrom,
            currencyTo,
            currencyString: '',
        };
    }
}
exports.CurrencyUtility = CurrencyUtility;
//# sourceMappingURL=currency.utility.js.map