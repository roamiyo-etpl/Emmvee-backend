"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_entity_1 = require("../../../shared/entities/city.entity");
const typeorm_2 = require("typeorm");
const state_entity_1 = require("../../../shared/entities/state.entity");
const country_entity_1 = require("../../../shared/entities/country.entity");
let GeographyRepository = class GeographyRepository {
    cityRepo;
    stateRepo;
    countryRepo;
    constructor(cityRepo, stateRepo, countryRepo) {
        this.cityRepo = cityRepo;
        this.stateRepo = stateRepo;
        this.countryRepo = countryRepo;
    }
    async updateCityVectorAndCityNameNormalized() {
        try {
            const cities = await this.cityRepo
                .createQueryBuilder()
                .update('city')
                .set({
                cityVector: () => `setweight(to_tsvector('english', coalesce(city_name, '')), 'A')`,
                cityNameNormalized: () => `lower(replace(city_name, ' ', ''))`,
            })
                .where('cityVector IS NULL')
                .andWhere('cityNameNormalized IS NULL')
                .execute();
            if (!cities) {
                throw new common_1.InternalServerErrorException('Failed to update city vector and city name normalized');
            }
            return {
                success: true,
                message: 'City vector and city name normalized updated successfully',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update city vector and city name normalized');
        }
    }
    async getCountryList(getCountryDto) {
        try {
            const query = this.countryRepo
                .createQueryBuilder('country')
                .select(['country.countryId AS "countryId"', 'country.countryName AS "countryName"', 'country.iso2 AS "iso2"', 'country.emojiU AS "emojiU"']);
            if (getCountryDto.countryName) {
                const countryName = getCountryDto.countryName.toLowerCase().trim();
                query.andWhere('country.countryName ILIKE :countryName', { countryName: `%${countryName}%` });
            }
            const countryList = await query.orderBy('country.countryName', 'ASC').getRawMany();
            if (!countryList) {
                throw new common_1.InternalServerErrorException('Failed to fetch country list');
            }
            return {
                message: 'Fetched Country List Successfully',
                data: countryList,
                success: true,
                totalCount: countryList.length,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch country list');
        }
    }
    async getStateList(getStateDto) {
        try {
            const { countryCode } = getStateDto;
            const query = this.stateRepo
                .createQueryBuilder('state')
                .where('state.countryCode = :countryCode', { countryCode })
                .select(['state.stateId AS "stateId"', 'state.stateName AS "stateName"', 'state.countryCode AS "countryCode"', 'state.iso2 AS "stateCode"']);
            if (getStateDto.stateName) {
                const stateName = getStateDto.stateName.toLowerCase().trim();
                query.andWhere('state.stateName ILIKE :stateName', { stateName: `%${stateName}%` });
            }
            const stateList = await query.orderBy('state.stateName', 'ASC').getRawMany();
            if (!stateList) {
                throw new common_1.InternalServerErrorException('Failed to fetch state list');
            }
            return {
                message: 'Fetched State List Successfully',
                data: stateList,
                success: true,
                totalCount: stateList.length,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch state list');
        }
    }
    async getCityList(getCityDto) {
        try {
            const { stateCode, countryCode } = getCityDto;
            const cityList = this.cityRepo
                .createQueryBuilder('city')
                .where('city.stateCode = :stateCode', { stateCode })
                .andWhere('city.countryCode = :countryCode', { countryCode })
                .select(['city.cityId AS "cityId"', 'city.cityName AS "cityName"', 'city.stateCode AS "stateCode"', 'city.countryCode AS "countryCode"']);
            if (getCityDto.cityName) {
                const cityName = getCityDto.cityName.toLowerCase().trim();
                cityList.andWhere('city.cityName ILIKE :cityName', { cityName: `%${cityName}%` });
            }
            const finalCityList = await cityList.orderBy('city.cityName', 'ASC').getRawMany();
            if (!finalCityList) {
                throw new common_1.InternalServerErrorException('Failed to fetch city list');
            }
            return {
                message: 'Fetched City List Successfully',
                data: finalCityList,
                success: true,
                totalCount: finalCityList.length,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch city list');
        }
    }
};
exports.GeographyRepository = GeographyRepository;
exports.GeographyRepository = GeographyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.CityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(state_entity_1.StateEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(country_entity_1.CountryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GeographyRepository);
//# sourceMappingURL=geography.repository.js.map