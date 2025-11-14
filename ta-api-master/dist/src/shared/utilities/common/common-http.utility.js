"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonHttpUtility = void 0;
const axios_1 = __importDefault(require("axios"));
class CommonHttpUtility {
    static async httpCurrencyConAPI(params) {
        try {
            const result = await (0, axios_1.default)({
                method: params.method,
                url: `${params.url}apiKey=${params.apiKey}`,
                timeout: 10000,
            });
            return result.data;
        }
        catch (error) {
            if (error.response) {
                console.error('Server responded with error status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
            else if (error.request) {
                console.error('No response received from the server');
            }
            else {
                console.error('Error setting up the request:', error.message);
            }
            return [];
        }
    }
}
exports.CommonHttpUtility = CommonHttpUtility;
//# sourceMappingURL=common-http.utility.js.map