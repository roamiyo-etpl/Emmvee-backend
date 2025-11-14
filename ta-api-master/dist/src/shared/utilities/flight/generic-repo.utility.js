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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const error_logs_entity_1 = require("../../entities/error-logs.entity");
let GenericRepo = class GenericRepo {
    errorLogsRepo;
    constructor(errorLogsRepo) {
        this.errorLogsRepo = errorLogsRepo;
    }
    async storeLogs(searchReqId, logsType, data, isEmail) {
        const message = {};
        Object.assign(message, { error: data.stack });
        const response = this.errorLogsRepo.create({
            logs_type: logsType,
            searchReqId: searchReqId,
            response: JSON.stringify(message),
            is_email: isEmail,
            date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
        });
        return await this.errorLogsRepo.save(response);
    }
    async getLogsByTime() {
        const currentTime = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        const found = await this.errorLogsRepo.find({
            where: {
                date: (0, typeorm_2.LessThanOrEqual)(currentTime),
            },
        });
        return found;
    }
    async deleteLogsByID(logIds) {
        return await this.errorLogsRepo.delete(logIds);
    }
};
exports.GenericRepo = GenericRepo;
exports.GenericRepo = GenericRepo = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(error_logs_entity_1.ErrorLogs)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GenericRepo);
//# sourceMappingURL=generic-repo.utility.js.map