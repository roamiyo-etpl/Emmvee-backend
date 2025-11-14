import { HotelBookService } from './book.service';
import { HotelBookInitiateResponse } from './interfaces/book-initiate-response.interface';
import { HotelBookInitiateDto } from './dtos/hotel-book-initiate.dto';
import { HotelBookConfirmationResponse } from './interfaces/book-confirmation-response.interface';
import { HotelBookConfirmationDto } from './dtos/hotel-book-confirmation.dto';
import { BookingDetailResponse } from './interfaces/booking-detail-response.interface';
export declare class HotelBookController {
    private readonly bookService;
    constructor(bookService: HotelBookService);
    initiate(bookDto: HotelBookInitiateDto, headers: any): Promise<HotelBookInitiateResponse>;
    bookConfirmation(bookDto: HotelBookConfirmationDto, headers: any): Promise<HotelBookConfirmationResponse>;
    bookingDetails(bookingRefId: string, headers: any): Promise<BookingDetailResponse>;
}
