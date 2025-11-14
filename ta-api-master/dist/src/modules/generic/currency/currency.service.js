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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const currency_repository_1 = require("./currency.repository");
const common_http_utility_1 = require("../../../shared/utilities/common/common-http.utility");
let CurrencyService = class CurrencyService {
    currencyRepo;
    constructor(currencyRepo) {
        this.currencyRepo = currencyRepo;
    }
    async updateCurrencyData() {
        try {
            let currenciesDB = await this.currencyRepo.getCurrencyData();
            if (!currenciesDB || currenciesDB.length === 0) {
                const currencyApiParams = {
                    method: 'GET',
                    url: `${process.env.CURR_RATE_API_URL}currencies?`,
                    apiKey: process.env.CURR_RATE_API_KEY,
                };
                const currenciesAPI = await common_http_utility_1.CommonHttpUtility.httpCurrencyConAPI(currencyApiParams);
                if (currenciesAPI.results) {
                    currenciesDB = await this.currencyRepo.addCurrencyData(currenciesAPI.results);
                }
            }
            const chunkSize = 15;
            const chunkedArr = [];
            for (let i = 0; i < currenciesDB.length; i += chunkSize) {
                const chunk = currenciesDB.slice(i, i + chunkSize);
                const currencyConversionString = chunk.map((currency) => `USD_${currency.code}`).join(',');
                chunkedArr.push(currencyConversionString);
            }
            if (chunkedArr.length > 0) {
                const conversionRequests = [];
                for (const row of chunkedArr) {
                    const currencyApiParams = {
                        method: 'GET',
                        url: `${process.env.CURR_RATE_API_URL}convert?q=${row}&compact=ultra&`,
                        apiKey: process.env.CURR_RATE_API_KEY,
                    };
                    conversionRequests.push(common_http_utility_1.CommonHttpUtility.httpCurrencyConAPI(currencyApiParams));
                }
                const currencyResponse = await Promise.allSettled(conversionRequests);
                if (currencyResponse.length > 0) {
                    await this.currencyRepo.upsertUsdBaseRatesFromResponse(currencyResponse);
                }
            }
            await this.generateCurrencyJsonFile();
        }
        catch (error) {
            throw error;
        }
    }
    async generateCurrencyJsonFile() {
        const currencies = await this.currencyRepo.getCurrencyData();
        const outputDir = (0, path_1.join)(process.cwd(), 'json');
        (0, fs_1.mkdirSync)(outputDir, { recursive: true });
        const data = {};
        for (const curr of currencies || []) {
            const code = curr.code || '';
            if (!code)
                continue;
            const rate = code === 'USD' ? 1 : typeof curr.baseRateUSD === 'number' ? curr.baseRateUSD : (curr.baseRateUSD ?? null);
            data[code] = {
                name: curr.name,
                symbol: curr.symbol,
                code,
                rate,
                symbol_placement: curr.symbolPlacement,
            };
        }
        const filePath = (0, path_1.join)(outputDir, 'currency.json');
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(data, null, 2));
    }
};
exports.CurrencyService = CurrencyService;
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [currency_repository_1.CurrencyRepository])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map