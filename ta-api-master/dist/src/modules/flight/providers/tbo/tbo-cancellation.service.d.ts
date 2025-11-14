import { TboAuthTokenService } from './tbo-auth-token.service';
import { SupplierLogUtility } from 'src/shared/utilities/flight/supplier-log.utility';
import { CancelResponse, CancellationChargesResponse } from 'src/modules/cancel/interfaces/cancel.interface';
export declare class TboCancellationService {
    private readonly tboAuthTokenService;
    private readonly supplierLogUtility;
    constructor(tboAuthTokenService: TboAuthTokenService, supplierLogUtility: SupplierLogUtility);
    cancel(cancelRequest: any): Promise<CancelResponse>;
    private releasePNR;
    private sendChangeRequest;
    private getChangeRequestStatus;
    private getCancellationCharges;
    fetchCancellationCharges(cancelRequest: any): Promise<CancellationChargesResponse>;
    private getCancellationStatusText;
    private getResponseStatusText;
    private generateRequestType;
    private generateCancellationType;
    private getBookingDetails;
}
