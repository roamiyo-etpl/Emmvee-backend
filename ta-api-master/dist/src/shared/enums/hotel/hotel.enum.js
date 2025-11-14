"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelSearchBy = exports.Channel = exports.HotelSearchType = exports.SortOrder = exports.RadiusUnit = exports.ApiEnvironment = void 0;
var ApiEnvironment;
(function (ApiEnvironment) {
    ApiEnvironment["TEST"] = "test";
    ApiEnvironment["PRODUCTION"] = "production";
})(ApiEnvironment || (exports.ApiEnvironment = ApiEnvironment = {}));
var RadiusUnit;
(function (RadiusUnit) {
    RadiusUnit["KM"] = "km";
    RadiusUnit["MI"] = "mi";
})(RadiusUnit || (exports.RadiusUnit = RadiusUnit = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var HotelSearchType;
(function (HotelSearchType) {
    HotelSearchType["HOTEL"] = "hotel";
    HotelSearchType["PIO"] = "poi";
    HotelSearchType["CITY"] = "city";
})(HotelSearchType || (exports.HotelSearchType = HotelSearchType = {}));
var Channel;
(function (Channel) {
    Channel["WEB"] = "web";
    Channel["MOBILE"] = "mobile";
    Channel["PARTNER"] = "partner";
})(Channel || (exports.Channel = Channel = {}));
var HotelSearchBy;
(function (HotelSearchBy) {
    HotelSearchBy["NAME"] = "name";
    HotelSearchBy["PRICE"] = "price";
    HotelSearchBy["DISTANCE"] = "distance";
    HotelSearchBy["RATING"] = "rating";
    HotelSearchBy["POPULARITY"] = "popularity";
    HotelSearchBy["BIGGEST"] = "biggest";
    HotelSearchBy["PERCENTAGE"] = "percentage";
    HotelSearchBy["SAVINGS"] = "savings";
})(HotelSearchBy || (exports.HotelSearchBy = HotelSearchBy = {}));
//# sourceMappingURL=hotel.enum.js.map