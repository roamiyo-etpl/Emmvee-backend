"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtility = void 0;
const moment_1 = __importDefault(require("moment"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class DateUtility {
    static currentDateTimeIST() {
        return moment_timezone_1.default.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss z');
    }
    static currentDateOnlyIST() {
        return moment_timezone_1.default.tz('Asia/Kolkata').format('YYYY-MM-DD z');
    }
    static convertDateIntoYMD(date) {
        return (0, moment_1.default)(date).format('YYYY-MM-DD');
    }
    static getTimeFromDateInHMA(date) {
        return (0, moment_1.default)(date).format('hh:mm A');
    }
    static convertMinutesIntoHoursMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }
    static toISOString(date) {
        return (0, moment_1.default)(date).toISOString();
    }
}
exports.DateUtility = DateUtility;
//# sourceMappingURL=date.utility.js.map