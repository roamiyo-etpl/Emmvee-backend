import { ProviderOrderDetailService } from '../providers/provider-order-detail.service';
import { OrderDetailResponse } from './interfaces/order-detail.interface';
import { OrderDetailDto } from './dtos/order-detail.dto';
import { OrderDetailRepository } from './order-detail.repository';
export declare class OrderDetailService {
    private readonly providerOrderDetailService;
    private readonly orderDetailRepository;
    constructor(providerOrderDetailService: ProviderOrderDetailService, orderDetailRepository: OrderDetailRepository);
    getOrderDetails(orderReq: OrderDetailDto, headers: Headers): Promise<{
        orderDetails: OrderDetailResponse[];
        supplierOrderDetailResponse: any[];
    }>;
    updateBookingStatus(): Promise<void>;
    createOrderDetailRequest(booking: any, bookingDetails: any[]): {
        providerCode: any;
        mode: string;
        bookingDetails: any[];
        searchReqId: any;
    };
    updateInProgressToFailed(): Promise<void>;
}
