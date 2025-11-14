"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currencies = exports.PassengerType = exports.CabinClass = exports.TripType = exports.AirlineCategory = void 0;
var AirlineCategory;
(function (AirlineCategory) {
    AirlineCategory["LCC"] = "LCC";
    AirlineCategory["Non_LCC"] = "Non_LCC";
})(AirlineCategory || (exports.AirlineCategory = AirlineCategory = {}));
var TripType;
(function (TripType) {
    TripType["ONEWAY"] = "oneway";
    TripType["ROUNDTRIP"] = "roundtrip";
    TripType["MULTI_CITY"] = "multi-city";
})(TripType || (exports.TripType = TripType = {}));
var CabinClass;
(function (CabinClass) {
    CabinClass["ECONOMY"] = "economy";
    CabinClass["BUSINESS"] = "business";
    CabinClass["FIRST"] = "first";
    CabinClass["PREMIUM_ECONOMY"] = "premium_economy";
})(CabinClass || (exports.CabinClass = CabinClass = {}));
var PassengerType;
(function (PassengerType) {
    PassengerType["ADULT"] = "ADT";
    PassengerType["CHILD"] = "CHD";
    PassengerType["INFANT"] = "INF";
})(PassengerType || (exports.PassengerType = PassengerType = {}));
var Currencies;
(function (Currencies) {
    Currencies["USD"] = "USD";
    Currencies["INR"] = "INR";
})(Currencies || (exports.Currencies = Currencies = {}));
//# sourceMappingURL=flight.enum.js.map