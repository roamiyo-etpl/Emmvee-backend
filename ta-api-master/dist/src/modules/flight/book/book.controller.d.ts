import { BookService } from './book.service';
import { BookConfirmationDto, BookDto } from './dtos/book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    bookingInitiate(bookDto: BookDto, headers: Headers): Promise<import("./interfaces/book.interface").BookInitiateResponse>;
    bookingConfirmation(bookDto: BookConfirmationDto, headers: Headers): Promise<import("./interfaces/book.interface").BookResponse>;
}
