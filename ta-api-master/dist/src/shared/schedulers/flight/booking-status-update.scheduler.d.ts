import { OrderDetailService } from 'src/modules/flight/order-details/order-detail.service';
export declare class BookingStatusUpdateScheduler {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    updateBookingStatus(): Promise<void>;
    updateInProgressToFailed(): Promise<void>;
}
