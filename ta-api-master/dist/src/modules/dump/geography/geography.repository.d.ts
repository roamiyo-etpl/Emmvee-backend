import { CityEntity } from 'src/shared/entities/city.entity';
import { Repository } from 'typeorm';
import { StateEntity } from 'src/shared/entities/state.entity';
import { CountryEntity } from 'src/shared/entities/country.entity';
import { CommonResponse } from 'src/shared/interfaces/common-response.interface';
import { GetCityDto } from './dtos/get-city.dto';
import { GetCountryDto } from './dtos/get-country.dto';
import { GetStateDto } from './dtos/get-state.dto';
import { GetStateListResponse, GetCountryListResponse, GetCityListResponse } from './interfaces/geography-response.interface';
export declare class GeographyRepository {
    private readonly cityRepo;
    private readonly stateRepo;
    private readonly countryRepo;
    constructor(cityRepo: Repository<CityEntity>, stateRepo: Repository<StateEntity>, countryRepo: Repository<CountryEntity>);
    updateCityVectorAndCityNameNormalized(): Promise<CommonResponse>;
    getCountryList(getCountryDto: GetCountryDto): Promise<GetCountryListResponse>;
    getStateList(getStateDto: GetStateDto): Promise<GetStateListResponse>;
    getCityList(getCityDto: GetCityDto): Promise<GetCityListResponse>;
}
