import { BookResponse } from '../book/interfaces/book.interface';
import { ConfigurationService } from '../configuration/configuration.service';
import { TboBookService } from './tbo/tbo-book.service';
import { ProviderOrderDetailService } from './provider-order-detail.service';
export declare class ProviderBookService {
    private configService;
    private tboBookService;
    private providerOrderDetailService;
    constructor(configService: ConfigurationService, tboBookService: TboBookService, providerOrderDetailService: ProviderOrderDetailService);
    providerBook(reqParams: any): Promise<BookResponse>;
    private buildOrderDetailDto;
    private mapOrderStatus;
}
