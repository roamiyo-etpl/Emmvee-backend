import { TboOrderDetailService } from "./tbo/tbo-order-detail.service";
export declare class ProviderOrderDetailService {
    private readonly tboOrderDetailService;
    constructor(tboOrderDetailService: TboOrderDetailService);
    orderDetail(orderReq: any, headers: any): Promise<any>;
}
