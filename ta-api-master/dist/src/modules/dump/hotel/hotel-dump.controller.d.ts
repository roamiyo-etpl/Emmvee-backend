import { HotelDumpService } from './hotel-dump.service';
import { HotelDetailRequestDto } from './dtos/hotel-detail.dto';
import { HotelAutocompleteDto } from './dtos/hotel-autocomplete.dto';
import { HotelAutocompleteResponse } from './interfaces/hotel-response.interface';
import { CommonResponse } from 'src/shared/interfaces/common-response.interface';
import { HotelDetailResponse } from './interfaces/hotel-detail.interface';
import { TransferDataToHotelContent } from './dtos/transfer-data-to-hotel-content.dto';
export declare class HotelDumpController {
    private readonly hotelDumpService;
    constructor(hotelDumpService: HotelDumpService);
    getHotelAutocomplete(hotelAutocompleteDto: HotelAutocompleteDto, headers: Headers): Promise<HotelAutocompleteResponse>;
    getHotelDetails(hotelDetailRequestDto: HotelDetailRequestDto, headers: Headers): Promise<HotelDetailResponse>;
    getHotelRoomContent(hotelDetailRequestDto: HotelDetailRequestDto, headers: Headers): Promise<any>;
    transferDataToHotelContent(transferData: TransferDataToHotelContent, headers: Headers): Promise<CommonResponse>;
    addCountryList(headers: Headers): Promise<CommonResponse>;
    addCityList(headers: Headers): Promise<CommonResponse>;
    addHotelList(headers: Headers): Promise<CommonResponse>;
}
