import { TboBookService } from './tbo/tbo-book.service';
export declare class ProviderBookService {
    private readonly tboBookService;
    constructor(tboBookService: TboBookService);
    bookConfirmation(bookReq: any, headers: any): Promise<any>;
}
