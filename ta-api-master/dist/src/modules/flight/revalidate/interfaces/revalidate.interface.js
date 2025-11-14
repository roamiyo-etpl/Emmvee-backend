"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationFareRule = exports.FareRules = exports.RevalidateData = exports.CharacterLimit = exports.RevalidateResponse = void 0;
class RevalidateResponse {
    isValid;
    isPriceChanged;
    error;
    message;
    searchReqId;
    hashReqKey;
    trackingId;
    mode;
    provider;
    prevSolutionID;
    isDomestic;
    route;
}
exports.RevalidateResponse = RevalidateResponse;
class CharacterLimit {
    firstName;
    lastName;
    paxName;
}
exports.CharacterLimit = CharacterLimit;
class RevalidateData {
    requiredFieldsToBook;
    characterLimit;
    solutionId;
    passportRequired;
    fare;
    fareRules;
    flightStops;
    airlineName;
    airlineCode;
    isRefundable;
    airlineType;
    departureInfo;
    arrivalInfo;
    totalDuration;
    totalInterval;
    flightSegments;
    supplierRes;
}
exports.RevalidateData = RevalidateData;
class FareRules {
    origin;
    Destination;
    Airline;
    FareRestriction;
    FareBasisCode;
    FareRuleDetail;
    DepartureDate;
    FlightNumber;
}
exports.FareRules = FareRules;
class CancellationFareRule {
    trackingId;
    fareRules;
    message;
    mode;
    error;
}
exports.CancellationFareRule = CancellationFareRule;
//# sourceMappingURL=revalidate.interface.js.map