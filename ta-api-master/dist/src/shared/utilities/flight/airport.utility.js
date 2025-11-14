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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airports = void 0;
exports.airportsDefault = airportsDefault;
const internal_server_error_exception_1 = require("@nestjs/common/exceptions/internal-server-error.exception");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
function airportsDefault(language) {
    const filePath = path_1.default.resolve(process.cwd(), `json/airport_${language || 'en'}.json`);
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`Airport data file not found: airport_${language || 'en'}.json - returning empty object`);
            return {};
        }
        const fileContent = fs.readFileSync(filePath, 'utf8').trim();
        if (!fileContent || fileContent.length === 0) {
            console.warn(`Airport data file is empty: airport_${language || 'en'}.json - returning empty object`);
            return {};
        }
        const airportsObj = JSON.parse(fileContent);
        return airportsObj;
    }
    catch (error) {
        if (error instanceof internal_server_error_exception_1.InternalServerErrorException) {
            throw error;
        }
        console.error(`Error reading airport data: ${error.message} - returning empty object`);
        return {};
    }
}
exports.airports = airportsDefault('en');
//# sourceMappingURL=airport.utility.js.map