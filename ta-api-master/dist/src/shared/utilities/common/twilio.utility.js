"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioUtility = void 0;
const axios_1 = __importDefault(require("axios"));
class TwilioUtility {
    static async verifyPhoneNumber(phoneNumber, accountSid, authToken) {
        try {
            const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
            const config = {
                method: 'GET',
                url: `https://lookups.twilio.com/v2/PhoneNumbers/${phoneNumber}`,
                headers: {
                    Authorization: `Basic ${authString}`,
                },
                timeout: 30000,
            };
            const response = await (0, axios_1.default)(config);
            if (response.data && response.data.valid === true) {
                return {
                    status: true,
                    data: response.data,
                };
            }
            else {
                return {
                    status: false,
                    data: response.data,
                };
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                return {
                    status: false,
                    data: error.response.data,
                };
            }
            return {
                status: false,
                data: {
                    error: error.message || 'Phone verification failed',
                },
            };
        }
    }
    static async phoneNumberVerifyApiCheck(phoneNumber, isActive, accountSid, authToken) {
        if (isActive) {
            const verifyResult = await this.verifyPhoneNumber(phoneNumber, accountSid, authToken);
            if (!verifyResult.status) {
                return {
                    status: false,
                    data: {
                        message: 'Phone verification failed',
                        error_data: verifyResult.data,
                    },
                };
            }
            return verifyResult;
        }
        else {
            return {
                status: true,
                data: {
                    message: 'Phone verification is disabled',
                },
            };
        }
    }
}
exports.TwilioUtility = TwilioUtility;
//# sourceMappingURL=twilio.utility.js.map