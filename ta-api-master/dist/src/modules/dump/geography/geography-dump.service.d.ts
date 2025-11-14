import { GeographyRepository } from './geography.repository';
import { CommonResponse } from 'src/shared/interfaces/common-response.interface';
import { GetCountryDto } from './dtos/get-country.dto';
import { GetStateDto } from './dtos/get-state.dto';
import { GetCityDto } from './dtos/get-city.dto';
import { GetCityListResponse, GetCountryListResponse, GetStateListResponse } from './interfaces/geography-response.interface';
export declare class GeographyDumpService {
    private readonly geographyRepository;
    private readonly logger;
    constructor(geographyRepository: GeographyRepository);
    updateCityVectorAndCityNameNormalized(): Promise<CommonResponse>;
    getCountryList(getCountryDto: GetCountryDto): Promise<GetCountryListResponse>;
    getStateList(getStateDto: GetStateDto): Promise<GetStateListResponse>;
    getCityList(getCityDto: GetCityDto): Promise<GetCityListResponse>;
}
