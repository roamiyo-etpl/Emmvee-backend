import { GenericCancelService } from './cancel.service';
import { GenericCancelDto, GenericGetCancellationChargesDto } from './dto/cancel.dto';
export declare class GenericCancelController {
    private readonly cancelService;
    constructor(cancelService: GenericCancelService);
    cancel(dto: GenericCancelDto, headers: Headers): Promise<import("./interfaces/cancel.interface").CancelResponse>;
    getCancellationCharges(dto: GenericGetCancellationChargesDto, headers: Headers): Promise<import("./interfaces/cancel.interface").CancellationChargesResponse>;
}
