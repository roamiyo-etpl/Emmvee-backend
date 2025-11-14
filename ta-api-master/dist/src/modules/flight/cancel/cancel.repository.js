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
exports.CancelRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
const cancellations_entity_1 = require("../../../shared/entities/cancellations.entity");
let CancelRepository = class CancelRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(bookings_entity_1.Booking, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createCancellationRecord(params) {
        const { bookingId, cancellationResponse, cancellationStatus, requestType, cancellationType, ticketIds } = params;
        const booking = await this.findOne({
            where: { supplier_reference_id: bookingId },
        });
        if (!booking) {
            throw new Error(`Booking not found with reference ID: ${bookingId}`);
        }
        const cancellation = new cancellations_entity_1.Cancellation();
        cancellation.booking_id = booking.booking_id;
        cancellation.booking_reference_id = booking.booking_reference_id;
        cancellation.supplier_reference_id = bookingId;
        cancellation.cancel_date = new Date();
        cancellation.change_request_id = cancellationResponse.changeRequestId || null;
        cancellation.trace_id = cancellationResponse.traceId || null;
        cancellation.status = this.mapCancellationStatus(cancellationResponse.status);
        cancellation.cancellation_charge = cancellationResponse.cancellationCharge || null;
        cancellation.refunded_amount = cancellationResponse.refundedAmount || null;
        cancellation.remarks = cancellationResponse.remarks || null;
        cancellation.request_type = this.mapRequestType(requestType);
        cancellation.cancellation_type = this.mapCancellationType(cancellationType);
        cancellation.credit_note_no = cancellationResponse.creditNoteNo || null;
        cancellation.credit_note_created_on = cancellationResponse.creditNoteCreatedOn ? new Date(cancellationResponse.creditNoteCreatedOn) : null;
        cancellation.ticket_ids = ticketIds && ticketIds.length > 0 ? ticketIds : null;
        if (cancellationStatus && requestType === 'FullCancellation') {
            booking.booking_status = bookings_entity_1.BookingStatus.CANCELLED;
            await this.save(booking);
        }
        return this.dataSource.getRepository(cancellations_entity_1.Cancellation).save(cancellation);
    }
    async getCancellationsByBookingId(params) {
        const { bookingId } = params;
        return this.dataSource.getRepository(cancellations_entity_1.Cancellation).find({
            where: { booking_id: bookingId },
            order: { created_at: 'DESC' },
        });
    }
    async updateCancellationDetails(params) {
        await this.createCancellationRecord(params);
    }
    mapRequestType(requestType) {
        if (!requestType)
            return null;
        const map = {
            'FullCancellation': cancellations_entity_1.CancellationRequestType.FullCancellation,
            'PartialCancellation': cancellations_entity_1.CancellationRequestType.PartialCancellation,
            'Reissuance': cancellations_entity_1.CancellationRequestType.Reissuance,
            '1': cancellations_entity_1.CancellationRequestType.FullCancellation,
            '2': cancellations_entity_1.CancellationRequestType.PartialCancellation,
            '3': cancellations_entity_1.CancellationRequestType.Reissuance,
        };
        return map[requestType] || null;
    }
    mapCancellationType(cancellationType) {
        if (!cancellationType)
            return null;
        const map = {
            'NotSet': cancellations_entity_1.CancellationTypeEnum.NotSet,
            'NoShow': cancellations_entity_1.CancellationTypeEnum.NoShow,
            'FlightCancelled': cancellations_entity_1.CancellationTypeEnum.FlightCancelled,
            'Others': cancellations_entity_1.CancellationTypeEnum.Others,
            '0': cancellations_entity_1.CancellationTypeEnum.NotSet,
            '1': cancellations_entity_1.CancellationTypeEnum.NoShow,
            '2': cancellations_entity_1.CancellationTypeEnum.FlightCancelled,
            '3': cancellations_entity_1.CancellationTypeEnum.Others,
        };
        return map[cancellationType] || null;
    }
    mapCancellationStatus(status) {
        if (status === undefined || status === null)
            return null;
        if (typeof status === 'number') {
            return status in cancellations_entity_1.CancellationStatusEnum ? status : null;
        }
        const normalized = (status || '').toString().trim();
        const map = {
            'Unassigned': cancellations_entity_1.CancellationStatusEnum.Unassigned,
            'Assigned': cancellations_entity_1.CancellationStatusEnum.Assigned,
            'Acknowledged': cancellations_entity_1.CancellationStatusEnum.Acknowledged,
            'Completed': cancellations_entity_1.CancellationStatusEnum.Completed,
            'Rejected': cancellations_entity_1.CancellationStatusEnum.Rejected,
            'Closed': cancellations_entity_1.CancellationStatusEnum.Closed,
            'Pending': cancellations_entity_1.CancellationStatusEnum.Pending,
            'Other': cancellations_entity_1.CancellationStatusEnum.Other,
            '0': cancellations_entity_1.CancellationStatusEnum.Unassigned,
            '1': cancellations_entity_1.CancellationStatusEnum.Assigned,
            '2': cancellations_entity_1.CancellationStatusEnum.Acknowledged,
            '3': cancellations_entity_1.CancellationStatusEnum.Completed,
            '4': cancellations_entity_1.CancellationStatusEnum.Rejected,
            '5': cancellations_entity_1.CancellationStatusEnum.Closed,
            '6': cancellations_entity_1.CancellationStatusEnum.Pending,
            '7': cancellations_entity_1.CancellationStatusEnum.Other,
        };
        return map[normalized] ?? null;
    }
};
exports.CancelRepository = CancelRepository;
exports.CancelRepository = CancelRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CancelRepository);
//# sourceMappingURL=cancel.repository.js.map