import { CancelService as FlightCancelService } from '../flight/cancel/cancel.service';
import { GenericCancelDto, GenericGetCancellationChargesDto } from './dto/cancel.dto';
export declare class GenericCancelService {
    private readonly flightCancelService;
    constructor(flightCancelService: FlightCancelService);
    cancel(reqParams: {
        cancelReq: GenericCancelDto;
        headers: any;
    }): Promise<import("./interfaces/cancel.interface").CancelResponse>;
    getCancellationCharges(reqParams: {
        cancelReq: GenericGetCancellationChargesDto;
        headers: any;
    }): Promise<import("./interfaces/cancel.interface").CancellationChargesResponse>;
}
