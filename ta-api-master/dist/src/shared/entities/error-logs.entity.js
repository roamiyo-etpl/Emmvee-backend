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
exports.ErrorLogs = void 0;
const typeorm_1 = require("typeorm");
let ErrorLogs = class ErrorLogs {
    log_id;
    logs_type;
    searchReqId;
    response;
    is_email;
    date;
};
exports.ErrorLogs = ErrorLogs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], ErrorLogs.prototype, "log_id", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { comment: '1 = errors' }),
    __metadata("design:type", Number)
], ErrorLogs.prototype, "logs_type", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: true }),
    __metadata("design:type", String)
], ErrorLogs.prototype, "searchReqId", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ErrorLogs.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { comment: '0 = not sent, 1 = email sent', default: 0 }),
    __metadata("design:type", Number)
], ErrorLogs.prototype, "is_email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], ErrorLogs.prototype, "date", void 0);
exports.ErrorLogs = ErrorLogs = __decorate([
    (0, typeorm_1.Entity)('error_logs')
], ErrorLogs);
//# sourceMappingURL=error-logs.entity.js.map