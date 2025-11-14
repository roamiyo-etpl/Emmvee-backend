"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumpModule = void 0;
const common_1 = require("@nestjs/common");
const hotel_dump_module_1 = require("./hotel/hotel-dump.module");
const geography_dump_module_1 = require("./geography/geography-dump.module");
let DumpModule = class DumpModule {
};
exports.DumpModule = DumpModule;
exports.DumpModule = DumpModule = __decorate([
    (0, common_1.Module)({
        imports: [hotel_dump_module_1.HotelDumpModule, geography_dump_module_1.GeographyDumpModule],
        exports: [hotel_dump_module_1.HotelDumpModule, geography_dump_module_1.GeographyDumpModule],
    })
], DumpModule);
//# sourceMappingURL=dump.module.js.map