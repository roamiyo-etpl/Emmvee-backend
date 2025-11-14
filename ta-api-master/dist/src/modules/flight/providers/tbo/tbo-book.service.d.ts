import { BookResponse } from '../../book/interfaces/book.interface';
import { TboAuthTokenService } from './tbo-auth-token.service';
import { GenericRepo } from 'src/shared/utilities/flight/generic-repo.utility';
import { RevalidateResponseEntity } from 'src/shared/entities/revalidate-response.entity';
import { Repository } from 'typeorm';
import { SupplierLogUtility } from 'src/shared/utilities/flight/supplier-log.utility';
export declare class TboBookService {
    private readonly tboAuthTokenService;
    private genericRepo;
    private revalidateRepo;
    private readonly supplierLogUtility;
    logDate: number;
    constructor(tboAuthTokenService: TboAuthTokenService, genericRepo: GenericRepo, revalidateRepo: Repository<RevalidateResponseEntity>, supplierLogUtility: SupplierLogUtility);
    book(bookRequest: any): Promise<BookResponse | void>;
    createSingleBook(reqParams: any): Promise<{
        ticketingResult: any;
        requestBodyTicketing?: any;
    }[]>;
    ticketingCall(reqParams: any): Promise<any>;
    createMultipleBook(reqParams: any): Promise<any[]>;
    createBookRequest(reqParams: any): Promise<any>;
}
