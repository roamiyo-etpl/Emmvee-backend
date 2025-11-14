"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const search_module_1 = require("./search/search.module");
const provider_module_1 = require("./providers/provider.module");
const provider_master_entity_1 = require("../../shared/entities/provider-master.entity");
const search_response_entity_1 = require("../../shared/entities/search-response.entity");
const error_logs_entity_1 = require("../../shared/entities/error-logs.entity");
const book_module_1 = require("./book/book.module");
const order_detail_module_1 = require("./order-details/order-detail.module");
const revalidate_module_1 = require("./revalidate/revalidate.module");
const balance_check_module_1 = require("./balance-check/balance-check.module");
const cancel_module_1 = require("./cancel/cancel.module");
const airline_module_1 = require("./airline/airline.module");
const airport_module_1 = require("./airport/airport.module");
let FlightModule = class FlightModule {
};
exports.FlightModule = FlightModule;
exports.FlightModule = FlightModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([provider_master_entity_1.ProviderMaster, search_response_entity_1.SearchResponse, error_logs_entity_1.ErrorLogs]),
            search_module_1.SearchModule,
            provider_module_1.ProviderModule,
            order_detail_module_1.OrderDetailModule,
            book_module_1.BookModule,
            revalidate_module_1.RevalidateModule,
            balance_check_module_1.BalanceCheckModule,
            cancel_module_1.CancelModule,
            airline_module_1.AirlineModule,
            airport_module_1.AirportModule,
        ],
        controllers: [],
        providers: [],
        exports: [search_module_1.SearchModule, provider_module_1.ProviderModule, order_detail_module_1.OrderDetailModule, book_module_1.BookModule, revalidate_module_1.RevalidateModule, balance_check_module_1.BalanceCheckModule, cancel_module_1.CancelModule, airline_module_1.AirlineModule, airport_module_1.AirportModule],
    })
], FlightModule);
//# sourceMappingURL=flight.module.js.map