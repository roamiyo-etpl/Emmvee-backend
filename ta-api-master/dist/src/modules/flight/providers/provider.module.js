"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const provider_master_entity_1 = require("../../../shared/entities/provider-master.entity");
const search_response_entity_1 = require("../../../shared/entities/search-response.entity");
const error_logs_entity_1 = require("../../../shared/entities/error-logs.entity");
const configuration_service_1 = require("../configuration/configuration.service");
const provider_repo_service_1 = require("./provider-repo.service");
const provider_search_service_1 = require("./provider-search.service");
const provider_book_service_1 = require("./provider-book.service");
const provider_revalidate_service_1 = require("./provider-revalidate.service");
const provider_order_detail_service_1 = require("./provider-order-detail.service");
const provider_cancellation_service_1 = require("./provider-cancellation.service");
const tbo_search_service_1 = require("./tbo/tbo-search.service");
const tbo_book_service_1 = require("./tbo/tbo-book.service");
const tbo_revalidate_service_1 = require("./tbo/tbo-revalidate.service");
const tbo_order_detail_service_1 = require("./tbo/tbo-order-detail.service");
const tbo_auth_token_service_1 = require("./tbo/tbo-auth-token.service");
const tbo_cancellation_service_1 = require("./tbo/tbo-cancellation.service");
const generic_repo_utility_1 = require("../../../shared/utilities/flight/generic-repo.utility");
const s3bucket_utility_1 = require("../../../shared/utilities/flight/s3bucket.utility");
const supplier_log_utility_1 = require("../../../shared/utilities/flight/supplier-log.utility");
const configuration_module_1 = require("../configuration/configuration.module");
const provider_balance_service_1 = require("./provider-balance.service");
const revalidate_response_entity_1 = require("../../../shared/entities/revalidate-response.entity");
let ProviderModule = class ProviderModule {
};
exports.ProviderModule = ProviderModule;
exports.ProviderModule = ProviderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([provider_master_entity_1.ProviderMaster, search_response_entity_1.SearchResponse, revalidate_response_entity_1.RevalidateResponseEntity, error_logs_entity_1.ErrorLogs]), configuration_module_1.ConfigurationModule, config_1.ConfigModule],
        providers: [
            configuration_service_1.ConfigurationService,
            provider_repo_service_1.ProviderRepoService,
            provider_search_service_1.ProviderSearchService,
            provider_book_service_1.ProviderBookService,
            provider_revalidate_service_1.ProviderRevalidateService,
            provider_order_detail_service_1.ProviderOrderDetailService,
            tbo_search_service_1.TboSearchService,
            tbo_book_service_1.TboBookService,
            tbo_revalidate_service_1.TboRevalidateService,
            tbo_order_detail_service_1.TboOrderDetailService,
            tbo_auth_token_service_1.TboAuthTokenService,
            tbo_cancellation_service_1.TboCancellationService,
            provider_balance_service_1.ProviderBalanceService,
            provider_cancellation_service_1.ProviderCancellationService,
            generic_repo_utility_1.GenericRepo,
            s3bucket_utility_1.s3BucketService,
            supplier_log_utility_1.SupplierLogUtility,
        ],
        exports: [
            configuration_service_1.ConfigurationService,
            provider_repo_service_1.ProviderRepoService,
            provider_search_service_1.ProviderSearchService,
            provider_book_service_1.ProviderBookService,
            provider_revalidate_service_1.ProviderRevalidateService,
            provider_order_detail_service_1.ProviderOrderDetailService,
            provider_cancellation_service_1.ProviderCancellationService,
            tbo_search_service_1.TboSearchService,
            tbo_book_service_1.TboBookService,
            tbo_revalidate_service_1.TboRevalidateService,
            tbo_order_detail_service_1.TboOrderDetailService,
            tbo_auth_token_service_1.TboAuthTokenService,
            tbo_cancellation_service_1.TboCancellationService,
            provider_balance_service_1.ProviderBalanceService,
            s3bucket_utility_1.s3BucketService,
            supplier_log_utility_1.SupplierLogUtility,
        ],
    })
], ProviderModule);
//# sourceMappingURL=provider.module.js.map