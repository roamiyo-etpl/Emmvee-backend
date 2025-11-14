"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevalidateModule = void 0;
const common_1 = require("@nestjs/common");
const revalidate_service_1 = require("./revalidate.service");
const revalidate_controller_1 = require("./revalidate.controller");
const provider_module_1 = require("../providers/provider.module");
const config_1 = require("@nestjs/config");
let RevalidateModule = class RevalidateModule {
};
exports.RevalidateModule = RevalidateModule;
exports.RevalidateModule = RevalidateModule = __decorate([
    (0, common_1.Module)({
        imports: [provider_module_1.ProviderModule, config_1.ConfigModule],
        providers: [revalidate_service_1.RevalidateService],
        controllers: [revalidate_controller_1.RevalidateController],
        exports: [revalidate_service_1.RevalidateService],
    })
], RevalidateModule);
//# sourceMappingURL=revalidate.module.js.map