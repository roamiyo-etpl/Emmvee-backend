"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = require("../config/configuration");
const typeorm_config_1 = require("../config/typeorm.config");
const validation_1 = require("../config/validation");
const hotel_module_1 = require("./modules/hotel/hotel.module");
const generic_module_1 = require("./modules/generic/generic.module");
const schedule_1 = require("@nestjs/schedule");
const common_scheduler_1 = require("./shared/schedulers/common/common.scheduler");
const flight_module_1 = require("./modules/flight/flight.module");
const cancel_module_1 = require("./modules/cancel/cancel.module");
const dump_module_1 = require("./modules/dump/dump.module");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_config_1 = require("../config/mail.config");
const booking_status_update_scheduler_1 = require("./shared/schedulers/flight/booking-status-update.scheduler");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`,
                load: [configuration_1.Configuration],
                validationSchema: validation_1.validationSchema,
            }),
            schedule_1.ScheduleModule.forRoot(),
            mailer_1.MailerModule.forRootAsync(mail_config_1.mailConfig),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfig),
            hotel_module_1.HotelModule,
            generic_module_1.GenericModule,
            hotel_module_1.HotelModule,
            flight_module_1.FlightModule,
            dump_module_1.DumpModule,
            cancel_module_1.GenericCancelModule,
        ],
        controllers: [],
        providers: [common_scheduler_1.CommonScheduler, booking_status_update_scheduler_1.BookingStatusUpdateScheduler],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map