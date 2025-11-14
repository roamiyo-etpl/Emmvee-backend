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
exports.GenericCancelService = void 0;
const common_1 = require("@nestjs/common");
const cancel_service_1 = require("../flight/cancel/cancel.service");
let GenericCancelService = class GenericCancelService {
    flightCancelService;
    constructor(flightCancelService) {
        this.flightCancelService = flightCancelService;
    }
    async cancel(reqParams) {
        const { cancelReq, headers } = reqParams;
        const mode = (cancelReq.mode || '').toString().toLowerCase();
        if (mode === 'flight') {
            const flightReq = { ...cancelReq };
            delete flightReq.mode;
            return this.flightCancelService.cancelFlight({ cancelReq: flightReq, headers });
        }
        if (mode === 'hotel') {
            throw new common_1.BadRequestException('Hotel cancellation is not implemented');
        }
        throw new common_1.BadRequestException('Invalid mode. Allowed: "flight" | "hotel"');
    }
    async getCancellationCharges(reqParams) {
        const { cancelReq, headers } = reqParams;
        const mode = (cancelReq.mode || '').toString().toLowerCase();
        if (mode === 'flight') {
            const flightReq = { ...cancelReq };
            delete flightReq.mode;
            return this.flightCancelService.getCancellationCharges({ cancelReq: flightReq, headers });
        }
        if (mode === 'hotel') {
            throw new common_1.BadRequestException('Hotel cancellation charges are not implemented');
        }
        throw new common_1.BadRequestException('Invalid mode. Allowed: "flight" | "hotel"');
    }
};
exports.GenericCancelService = GenericCancelService;
exports.GenericCancelService = GenericCancelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cancel_service_1.CancelService])
], GenericCancelService);
//# sourceMappingURL=cancel.service.js.map