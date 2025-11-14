import { ProviderBookService } from '../providers/provider-book.service';
import { HotelBookInitiateResponse } from './interfaces/book-initiate-response.interface';
import { HotelBookInitiateDto } from './dtos/hotel-book-initiate.dto';
import { HotelBookConfirmationDto } from './dtos/hotel-book-confirmation.dto';
import { HotelBookConfirmationResponse } from './interfaces/book-confirmation-response.interface';
import { HotelRoomService } from '../room/room.service';
import { BookRepository } from './book.repository';
import { SupplierCredService } from 'src/modules/generic/supplier-credientials/supplier-cred.service';
import { BookingDetailResponse } from './interfaces/booking-detail-response.interface';
export declare class HotelBookService {
    private readonly providerBookService;
    private readonly hotelRoomService;
    private readonly bookRepository;
    private supplierCred;
    private readonly logger;
    constructor(providerBookService: ProviderBookService, hotelRoomService: HotelRoomService, bookRepository: BookRepository, supplierCred: SupplierCredService);
    initiate(bookDto: HotelBookInitiateDto, headers: Headers): Promise<HotelBookInitiateResponse>;
    bookConfirmation(bookReq: HotelBookConfirmationDto, headers: Headers): Promise<HotelBookConfirmationResponse>;
    getBookingDetails(bookingRefId: string, headers: Record<string, string>): Promise<BookingDetailResponse>;
    private transformPaxesData;
    private validatePassengerDocuments;
    private calculateAgeFromDob;
}
