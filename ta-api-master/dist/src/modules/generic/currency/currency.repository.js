"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const currency_rate_entity_1 = require("../../../shared/entities/currency-rate.entity");
let CurrencyRepository = class CurrencyRepository {
    currencyRepo;
    constructor(currencyRepo) {
        this.currencyRepo = currencyRepo;
    }
    async getCurrencyData() {
        const currencies = await this.currencyRepo.find();
        if (!currencies || currencies.length === 0) {
            return [];
        }
        else {
            return currencies;
        }
    }
    async addCurrencyData(currencies) {
        try {
            const currenciesData = [];
            const result = Object.values(currencies);
            if (result && result.length > 0) {
                for (const currency of result) {
                    const currencyData = new currency_rate_entity_1.CurrencyConversionEntity();
                    currencyData.code = currency.id;
                    currencyData.name = currency.currencyName;
                    currencyData.symbol = currency?.currencySymbol ?? currency.id;
                    currenciesData.push(currencyData);
                }
                if (currenciesData.length > 0) {
                    return await this.currencyRepo.save(currenciesData);
                }
                else {
                    return [];
                }
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.log('Error in addCurrencyData', error);
            throw error;
        }
    }
    async upsertUsdBaseRatesFromResponse(currencyResponse) {
        try {
            const codeToRateMap = new Map();
            for (const item of currencyResponse || []) {
                const data = item && typeof item === 'object' && 'status' in item ? (item.status === 'fulfilled' ? item.value : null) : item;
                if (!data || typeof data !== 'object')
                    continue;
                for (const [pair, rate] of Object.entries(data)) {
                    if (typeof rate !== 'number')
                        continue;
                    const parts = pair.split('_');
                    if (parts.length !== 2)
                        continue;
                    const [base, quote] = parts;
                    if (base !== 'USD')
                        continue;
                    const code = quote.toUpperCase();
                    codeToRateMap.set(code, rate);
                }
            }
            if (codeToRateMap.size === 0) {
                return 0;
            }
            const codes = Array.from(codeToRateMap.keys());
            const existing = await this.currencyRepo.find({ where: { code: (0, typeorm_1.In)(codes) } });
            if (!existing.length) {
                return 0;
            }
            for (const entity of existing) {
                const rate = codeToRateMap.get(entity.code);
                if (typeof rate === 'number') {
                    entity.baseRateUSD = rate;
                }
            }
            await this.currencyRepo.save(existing);
            return existing.length;
        }
        catch (error) {
            console.log('Error in upsertUsdBaseRatesFromResponse', error);
            throw error;
        }
    }
};
exports.CurrencyRepository = CurrencyRepository;
exports.CurrencyRepository = CurrencyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(currency_rate_entity_1.CurrencyConversionEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CurrencyRepository);
//# sourceMappingURL=currency.repository.js.map