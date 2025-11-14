import { ProviderOrderDetailService } from '../providers/provider-order-detail.service';
import { SupplierCredService } from 'src/modules/generic/supplier-credientials/supplier-cred.service';
export declare class HotelOrderDetailService {
    private readonly providerOrderDetailService;
    private supplierCred;
    private readonly logger;
    constructor(providerOrderDetailService: ProviderOrderDetailService, supplierCred: SupplierCredService);
    getOrderDetails(orderReq: any, headers: Headers): Promise<any>;
    private convertBookingResponse;
    private calculateNights;
}
