"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationChargesResponse = exports.CancellationStatusResponse = exports.CancelResponse = void 0;
class CancelResponse {
    success;
    message;
    mode;
    cancellationStatus;
    cancellationCharge;
    refundedAmount;
    status;
    remarks;
    creditNoteNo;
    creditNoteCreatedOn;
    error;
}
exports.CancelResponse = CancelResponse;
class CancellationStatusResponse {
    changeRequestId;
    refundedAmount;
    cancellationCharge;
    refundAmount;
    status;
    remarks;
    currency;
    provider;
}
exports.CancellationStatusResponse = CancellationStatusResponse;
class CancellationChargesResponse {
    success;
    supplierResponseStatus;
    refundAmount;
    cancellationCharge;
    remarks;
    currency;
    traceId;
    error;
}
exports.CancellationChargesResponse = CancellationChargesResponse;
//# sourceMappingURL=cancel.interface.js.map