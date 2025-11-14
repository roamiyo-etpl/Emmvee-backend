"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MwrLifeHttpUtility = void 0;
const axios_1 = __importDefault(require("axios"));
class MwrLifeHttpUtility {
    static async mwrLifeAPI(params) {
        try {
            const result = await (0, axios_1.default)({
                method: params.method,
                url: params.url,
                timeout: 15000,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: params.body,
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
exports.MwrLifeHttpUtility = MwrLifeHttpUtility;
//# sourceMappingURL=mwrlife-http.utility.js.map