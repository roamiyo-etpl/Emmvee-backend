import { ConfigurationService } from '../configuration/configuration.service';
import { OrderDetailResponse } from '../order-details/interfaces/order-detail.interface';
import { TboOrderDetailService } from './tbo/tbo-order-detail.service';
export declare class ProviderOrderDetailService {
    private configService;
    private tboOrderService;
    constructor(configService: ConfigurationService, tboOrderService: TboOrderDetailService);
    providerOrderDetail(reqParams: any): Promise<{
        orderDetails: OrderDetailResponse[];
        supplierOrderDetailResponse: any[];
    }>;
}
