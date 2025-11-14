"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailPassenger = exports.OrderDetailResponse = exports.OrderRoutes = void 0;
class OrderRoutes {
    fare;
    fareRules;
    flightStops;
    airlineName;
    airlineCode;
    departureInfo;
    arrivalInfo;
    totalDuration;
    totalInterval;
    flightSegments;
    isRefundable;
    separateRoute;
}
exports.OrderRoutes = OrderRoutes;
class OrderDetailResponse {
    error;
    message;
    searchReqId;
    mode;
    bookingRefNumber;
    pnr;
    bookingId;
    ticketNumber;
    ticketId;
    bookingStatus;
    passengers;
    routes;
}
exports.OrderDetailResponse = OrderDetailResponse;
class orderDetailPassengerDetail {
    firstName;
    lastName;
    title;
}
class orderDocument {
    documentType;
    documentNumber;
    expiryDate;
    country;
}
class OrderDetailPassenger {
    passengerType;
    gender;
    passengerDetail;
    dateOfBirth;
    document;
    nationality;
    mobile;
    mobileCountryCode;
    ticketId;
}
exports.OrderDetailPassenger = OrderDetailPassenger;
class CancellationRules {
    adultCharges;
    refundable;
    durationTo;
    durationFrom;
    returnFlight;
    remarks;
    type;
    childCharges;
    infantCharges;
    passengerType;
}
//# sourceMappingURL=order-detail.interface.js.map