"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookInitiateResponse = exports.BookResponse = exports.Order = void 0;
class Order {
    orderNo;
    pnr;
    orderAmount;
    currency;
    orderStatus;
    isPriceChanged;
    isScheduleChanged;
    fareType;
    supplierBaseAmount;
}
exports.Order = Order;
class BookResponse {
    error;
    message;
    mode;
    searchReqId;
    supplierMessage;
    orderDetail;
    orderDetails;
    supplierOrderDetailResponse;
    rawSupplierResponse;
}
exports.BookResponse = BookResponse;
class BookInitiateResponse {
    error;
    message;
    booking_log_id;
    search_req_id;
    booking_id;
    fare;
}
exports.BookInitiateResponse = BookInitiateResponse;
//# sourceMappingURL=book.interface.js.map