import { ProviderBookService } from '../providers/provider-book.service';
import { BookInitiateResponse, BookResponse } from './interfaces/book.interface';
import { BookRepository } from './book.repository';
import { RevalidateService } from '../revalidate/revalidate.service';
export declare class BookService {
    private readonly providerBookService;
    private readonly bookRepository;
    private readonly revalidateService;
    constructor(providerBookService: ProviderBookService, bookRepository: BookRepository, revalidateService: RevalidateService);
    bookingInitiate(reqParams: any): Promise<BookInitiateResponse>;
    bookingConfirmation(reqParams: any): Promise<BookResponse>;
}
