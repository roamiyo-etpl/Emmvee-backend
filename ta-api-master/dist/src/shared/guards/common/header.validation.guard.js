"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderValidationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const fs = __importStar(require("fs"));
let HeaderValidationGuard = class HeaderValidationGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handler = context.getHandler();
        const controller = context.getClass();
        const requiredHeaders = this.reflector.get('requiredHeaders', handler) || this.reflector.get('requiredHeaders', controller);
        if (!requiredHeaders || requiredHeaders.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const headers = request.headers ?? {};
        const errors = [];
        for (const header of requiredHeaders) {
            if (!headers[header.toLowerCase()]) {
                errors.push(`${header} header is required`);
            }
            if (header.toLowerCase() === 'api-version' && !/^v[0-9]+(\.[0-9]+)*$/.test(headers[header.toLowerCase()])) {
                errors.push('Invalid Api-version format. Expected format: v1, v1.0, etc.');
            }
            if (header.toLowerCase() === 'ip-address' &&
                !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(headers['ip-address'])) {
                errors.push('Invalid Ip-Address format. Expected format: xxx.xxx.xxx.xxx');
            }
            if (header.toLocaleLowerCase() === 'currency-preference') {
                const currencyFile = (0, path_1.join)(process.cwd(), 'json', 'currency.json');
                const currencyData = JSON.parse(fs.readFileSync(currencyFile, 'utf8'));
                const preferredCurrency = headers['currency-preference'];
                if (headers['currency-preference']?.length !== 3 && !/^[A-Z]{3}$/.test(headers['currency-preference'])) {
                    errors.push('Invalid Currency-Preference format. Expected format: 3 digit currency code');
                }
                else if (!currencyData[preferredCurrency.toUpperCase()]) {
                    errors.push(`${preferredCurrency} is not a supported currency. Please provide a valid currency code.`);
                }
            }
            if (header.toLocaleLowerCase() === 'language' && (typeof headers['language'] !== 'string' || !headers['language'].trim())) {
                errors.push('Invalid Language format. Expected a non-empty string');
            }
            if (header.toLocaleLowerCase() === 'club-id' && (typeof headers['club-id'] !== 'string' || !headers['club-id'].trim())) {
                errors.push('Invalid Club-Id format. Expected a non-empty string');
            }
            if (header.toLocaleLowerCase() === 'device-information' && typeof headers['device-information'] !== 'string') {
                errors.push('Invalid Device-Information format. Expected a string');
            }
        }
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors.join(', '));
        }
        return true;
    }
};
exports.HeaderValidationGuard = HeaderValidationGuard;
exports.HeaderValidationGuard = HeaderValidationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], HeaderValidationGuard);
//# sourceMappingURL=header.validation.guard.js.map