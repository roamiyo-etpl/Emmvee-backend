import { GenericRepo } from 'src/shared/utilities/flight/generic-repo.utility';
import { s3BucketService } from 'src/shared/utilities/flight/s3bucket.utility';
import { TboAuthTokenService } from './tbo-auth-token.service';
import { OrderDetailResponse } from '../../order-details/interfaces/order-detail.interface';
import { Segment } from '../../search/interfaces/start-routing.interface';
import { SupplierLogUtility } from 'src/shared/utilities/flight/supplier-log.utility';
import { RevalidateResponseEntity } from 'src/shared/entities/revalidate-response.entity';
import { Repository } from 'typeorm';
export declare class TboOrderDetailService {
    private readonly tboAuthTokenService;
    private readonly genericRepo;
    private readonly s3Service;
    private readonly supplierLogUtility;
    private revalidateRepo;
    logDate: number;
    constructor(tboAuthTokenService: TboAuthTokenService, genericRepo: GenericRepo, s3Service: s3BucketService, supplierLogUtility: SupplierLogUtility, revalidateRepo: Repository<RevalidateResponseEntity>);
    getOrderDetails(orderRequest: any): Promise<{
        orderDetails: OrderDetailResponse[];
        supplierOrderDetailResponse: any[];
    }>;
    convertResponse(tripResult: any, orderRequest: any): Promise<OrderDetailResponse>;
    separateBySegmentIndicator(data: any): unknown[];
    settingUpSegments(segment: any): Segment;
    settingUpLocationInfo(flightSegment: any): never[];
}
