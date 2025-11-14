import { GeographyDumpService } from './geography-dump.service';
import { GetCountryDto } from './dtos/get-country.dto';
import { GetStateDto } from './dtos/get-state.dto';
import { GetCityDto } from './dtos/get-city.dto';
import { GetCityListResponse, GetCountryListResponse, GetStateListResponse } from './interfaces/geography-response.interface';
import { CommonResponse } from 'src/shared/interfaces/common-response.interface';
export declare class GeographyDumpController {
    private readonly geographyDumpService;
    constructor(geographyDumpService: GeographyDumpService);
    getCountryList(getCountryDto: GetCountryDto, headers: Headers): Promise<GetCountryListResponse>;
    getStateList(getStateDto: GetStateDto, headers: Headers): Promise<GetStateListResponse>;
    getCityList(getCityDto: GetCityDto, headers: Headers): Promise<GetCityListResponse>;
    updateCityVectorAndCityNameNormalized(headers: Headers): Promise<CommonResponse>;
}
