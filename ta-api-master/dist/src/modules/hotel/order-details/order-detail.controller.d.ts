import { HotelOrderDetailService } from './order-detail.service';
export declare class HotelOrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: HotelOrderDetailService);
    getOrderDetails(orderReq: any, headers: Headers): Promise<any>;
}
