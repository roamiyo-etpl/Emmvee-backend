"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const search_controller_1 = require("./search.controller");
const search_service_1 = require("./search.service");
const providers_module_1 = require("../providers/providers.module");
const generic_module_1 = require("../../generic/generic.module");
const caching_utility_1 = require("../../../shared/utilities/common/caching.utility");
const cacheable_1 = require("cacheable");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [providers_module_1.ProvidersModule, generic_module_1.GenericModule],
        controllers: [search_controller_1.SearchController],
        providers: [
            search_service_1.SearchService,
            caching_utility_1.CachingUtility,
            {
                provide: 'CACHE_INSTANCE',
                useValue: new cacheable_1.Cacheable(),
            },
        ],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map