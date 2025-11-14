import { OrderDetailService } from './order-detail.service';
import { OrderDetailDto } from './dtos/order-detail.dto';
import { OrderDetailResponse } from './interfaces/order-detail.interface';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    getOrderDetails(orderReq: OrderDetailDto, headers: Headers): Promise<OrderDetailResponse[]>;
}
