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
exports.ProviderBookService = void 0;
const common_1 = require("@nestjs/common");
const tbo_book_service_1 = require("./tbo/tbo-book.service");
let ProviderBookService = class ProviderBookService {
    tboBookService;
    constructor(tboBookService) {
        this.tboBookService = tboBookService;
    }
    async bookConfirmation(bookReq, headers) {
        const { activeProviders } = bookReq;
        const bookRequest = [];
        try {
            const bookResult = [];
            const activeProvidersName = activeProviders.map((data) => {
                const cred = JSON.parse(data.providerCredentials);
                return cred.provider;
            });
            const language = headers['language']?.toUpperCase() || 'en';
            Object.assign(bookReq, { currency: headers['currency-preference']?.toUpperCase() || 'USD' });
            Object.assign(bookReq, { language: language });
            bookRequest['language'] = language;
            bookRequest['bookReq'] = bookReq;
            if (activeProvidersName.indexOf('TBO') !== -1) {
                console.log('TBO found for room book');
                const tboCred = activeProviders.filter((item) => {
                    const cred = JSON.parse(item.providerCredentials);
                    return cred.provider == 'TBO';
                });
                if (tboCred.length > 0) {
                    bookRequest['assignedId'] = tboCred[0]?.assignedId;
                    bookRequest['providerCred'] = tboCred[0]?.providerCredentials;
                    const tboBookResult = await this.tboBookService.bookConfirmation(bookReq, JSON.parse(tboCred[0]?.providerCredentials), headers);
                    bookResult.push(tboBookResult);
                }
            }
            if (activeProvidersName.indexOf('HOB') !== -1) {
                const hobCred = activeProviders.filter((item) => {
                    return item.code == 'HOB';
                });
                if (hobCred.length > 0) {
                    bookRequest['assignedId'] = hobCred[0]?.assignedId;
                    bookRequest['providerCred'] = hobCred[0]?.providerCredentials;
                }
            }
            const result = bookResult;
            return Array.isArray(result) ? result[0] : result;
        }
        catch (error) {
            console.log('supplier room book error', error);
            throw new common_1.InternalServerErrorException('ERR_ISSUE_IN_FETCHING_DATA_FROM_PROVIDER');
        }
    }
};
exports.ProviderBookService = ProviderBookService;
exports.ProviderBookService = ProviderBookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbo_book_service_1.TboBookService])
], ProviderBookService);
//# sourceMappingURL=provider-book.service.js.map