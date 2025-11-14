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
exports.CancelService = void 0;
const common_1 = require("@nestjs/common");
const provider_cancellation_service_1 = require("../providers/provider-cancellation.service");
const cancel_repository_1 = require("./cancel.repository");
let CancelService = class CancelService {
    providerCancellationService;
    cancelRepository;
    constructor(providerCancellationService, cancelRepository) {
        this.providerCancellationService = providerCancellationService;
        this.cancelRepository = cancelRepository;
    }
    async cancelFlight(reqParams) {
        const { cancelReq, headers } = reqParams;
        try {
            this.validateCancelRequest(cancelReq);
            const booking = await this.cancelRepository.findOne({
                where: { supplier_reference_id: cancelReq.bookingId.toString() },
            });
            if (!booking) {
                throw new common_1.BadRequestException('Booking not found');
            }
            cancelReq.supplierParams = {
                ...(cancelReq.supplierParams || {}),
                providerCode: booking.supplier_name,
            };
            const result = await this.providerCancellationService.providerCancel({
                cancelReq,
                headers,
                booking,
            });
            if (result.success) {
                try {
                    await this.cancelRepository.createCancellationRecord({
                        bookingId: cancelReq.bookingId.toString(),
                        cancellationResponse: result,
                        cancellationStatus: result.cancellationStatus === true,
                        requestType: cancelReq.requestType,
                        cancellationType: cancelReq.cancellationType,
                        ticketIds: cancelReq.ticketIds || undefined,
                    });
                }
                catch (dbError) {
                    console.error('Error saving cancellation record:', dbError);
                }
            }
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: error.message || 'Cancellation failed',
                error: error.message,
            });
        }
    }
    async getCancellationCharges(reqParams) {
        const { cancelReq } = reqParams;
        if (!cancelReq?.bookingId) {
            throw new common_1.BadRequestException('bookingId is required');
        }
        const booking = await this.cancelRepository.findOne({
            where: { supplier_reference_id: cancelReq.bookingId.toString() },
        });
        if (!booking) {
            throw new common_1.BadRequestException('Booking not found');
        }
        cancelReq.supplierParams = {
            ...(cancelReq.supplierParams || {}),
            providerCode: booking.supplier_name,
        };
        return this.providerCancellationService.providerCancellationCharges({ cancelReq, headers: reqParams.headers, booking });
    }
    validateCancelRequest(cancelReq) {
        if (!cancelReq.bookingId) {
            throw new common_1.BadRequestException('Booking ID is required');
        }
        if (!cancelReq.requestType) {
            throw new common_1.BadRequestException('Request type is required');
        }
        if ((cancelReq.requestType || '').toString().toLowerCase() === 'partialcancellation') {
            const sp = cancelReq.supplierParams || {};
            if (!sp.sectors && !sp.ticketIds) {
                throw new common_1.BadRequestException('Sectors or ticket IDs are required for partial cancellation');
            }
        }
    }
};
exports.CancelService = CancelService;
exports.CancelService = CancelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_cancellation_service_1.ProviderCancellationService,
        cancel_repository_1.CancelRepository])
], CancelService);
//# sourceMappingURL=cancel.service.js.map