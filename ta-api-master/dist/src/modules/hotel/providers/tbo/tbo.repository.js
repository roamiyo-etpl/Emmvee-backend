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
exports.TboRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hotel_master_entity_1 = require("../../../../shared/entities/hotel-master.entity");
let TboRepository = class TboRepository {
    hotelMasterRepo;
    constructor(hotelMasterRepo) {
        this.hotelMasterRepo = hotelMasterRepo;
    }
    async findHotelsByCity(cityName) {
        try {
            return await this.hotelMasterRepo
                .createQueryBuilder('hotel')
                .where('LOWER(hotel.city) LIKE LOWER(:cityName)', { cityName: `%${cityName}%` })
                .andWhere('hotel.isActive = :isActive', { isActive: true })
                .andWhere('hotel.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('hotel.providerCode = :providerCode', { providerCode: 'TBO' })
                .getMany();
        }
        catch (error) {
            console.error('Error finding hotels by city:', error);
            throw new common_1.BadRequestException('Failed to find hotels by city');
        }
    }
    async findHotelsByCityId(cityId) {
        try {
            return await this.hotelMasterRepo
                .createQueryBuilder('hotel')
                .where('hotel.city = :cityId', { cityId })
                .andWhere('hotel.isActive = :isActive', { isActive: true })
                .andWhere('hotel.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('hotel.providerCode = :providerCode', { providerCode: 'TBO' })
                .getMany();
        }
        catch (error) {
            console.error('Error finding hotels by city ID:', error);
            throw new common_1.BadRequestException('Failed to find hotels by city ID');
        }
    }
    async findHotelsByHotelCode(hotelCodes) {
        try {
            if (!hotelCodes || hotelCodes.length === 0) {
                return [];
            }
            return await this.hotelMasterRepo
                .createQueryBuilder('hotel')
                .where('hotel.hotelCode IN (:...hotelCodes)', { hotelCodes })
                .andWhere('hotel.isActive = :isActive', { isActive: true })
                .andWhere('hotel.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('hotel.providerCode = :providerCode', { providerCode: 'TBO' })
                .getMany();
        }
        catch (error) {
            console.error('Error finding hotels by hotel code:', error);
            throw new common_1.BadRequestException('Failed to find hotels by hotel code');
        }
    }
    async findHotelDetailsByHotelCode(hotelCode) {
        try {
            return await this.hotelMasterRepo
                .createQueryBuilder('hotel')
                .where('hotel.hotelCode = :hotelCode', { hotelCode })
                .andWhere('hotel.isActive = :isActive', { isActive: true })
                .andWhere('hotel.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('hotel.providerCode = :providerCode', { providerCode: 'TBO' })
                .getOne();
        }
        catch (error) {
            console.error('Error finding hotel details by hotel code:', error);
            throw new common_1.BadRequestException('Failed to find hotel details by hotel code');
        }
    }
    async findHotelsByMap(map, radiusInKm = 50) {
        const { lat, lng } = map;
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            throw new common_1.BadRequestException('Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180');
        }
        try {
            const query = `
                SELECT *,
                (6371 * acos(
                    cos(radians($1)) * 
                    cos(radians(latitude)) * 
                    cos(radians(longitude) - radians($2)) + 
                    sin(radians($1)) * 
                    sin(radians(latitude))
                )) AS distance
                FROM hotel_master 
                WHERE is_active = true 
                AND is_deleted = false 
                AND provider_code = 'TBO'
                AND latitude IS NOT NULL 
                AND longitude IS NOT NULL
                HAVING distance < $3
                ORDER BY distance
            `;
            return await this.hotelMasterRepo.query(query, [lat, lng, radiusInKm]);
        }
        catch (error) {
            console.error('Error finding hotels by map:', error);
            throw new common_1.BadRequestException('Failed to find hotels by map coordinates');
        }
    }
    async findHotelByCode(hotelCode) {
        return this.findHotelDetailsByHotelCode(hotelCode);
    }
    async findHotelsByName(hotelName) {
        try {
            return await this.hotelMasterRepo
                .createQueryBuilder('hotel')
                .where('LOWER(hotel.hotelName) LIKE LOWER(:hotelName)', { hotelName: `%${hotelName}%` })
                .andWhere('hotel.isActive = :isActive', { isActive: true })
                .andWhere('hotel.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('hotel.providerCode = :providerCode', { providerCode: 'TBO' })
                .getMany();
        }
        catch (error) {
            console.error('Error finding hotels by name:', error);
            throw new common_1.BadRequestException('Failed to find hotels by name');
        }
    }
    async findHotelsByCoordinates(coordinates, radiusKm = 50) {
        const { lat, lng } = coordinates;
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            throw new common_1.BadRequestException('Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180');
        }
        if (radiusKm <= 0) {
            throw new common_1.BadRequestException('Radius must be greater than 0');
        }
        try {
            const latRadiusInDegrees = radiusKm / 111;
            const latMin = lat - latRadiusInDegrees;
            const latMax = lat + latRadiusInDegrees;
            const lngDegreeLength = 111 * Math.cos((lat * Math.PI) / 180);
            const lngRadiusInDegrees = radiusKm / lngDegreeLength;
            const lngMin = lng - lngRadiusInDegrees;
            const lngMax = lng + lngRadiusInDegrees;
            const query = this.hotelMasterRepo
                .createQueryBuilder('hotel')
                .where('hotel.latitude IS NOT NULL AND hotel.longitude IS NOT NULL')
                .andWhere('hotel.latitude BETWEEN :latMin AND :latMax', {
                latMin,
                latMax,
            })
                .andWhere('hotel.longitude BETWEEN :lngMin AND :lngMax', {
                lngMin,
                lngMax,
            })
                .andWhere('hotel.isActive = :isActive', { isActive: true })
                .andWhere('hotel.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('hotel.providerCode = :providerCode', { providerCode: 'TBO' })
                .andWhere(`
                    6371 * acos(
                      greatest(-1, least(1,
                        cos(radians(:lat)) * cos(radians(hotel.latitude)) *
                        cos(radians(hotel.longitude) - radians(:lng)) +
                        sin(radians(:lat)) * sin(radians(hotel.latitude))
                      ))
                    ) <= :radius
                    `, { lat, lng, radius: radiusKm })
                .orderBy(`
                    6371 * acos(
                      greatest(-1, least(1,
                        cos(radians(:lat)) * cos(radians(hotel.latitude)) *
                        cos(radians(hotel.longitude) - radians(:lng)) +
                        sin(radians(:lat)) * sin(radians(hotel.latitude))
                      ))
                    )
                    `, 'ASC');
            return await query.getMany();
        }
        catch (error) {
            console.error('Error finding hotels by coordinates:', error);
            throw new common_1.BadRequestException('Failed to find hotels by location');
        }
    }
};
exports.TboRepository = TboRepository;
exports.TboRepository = TboRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_master_entity_1.HotelMasterEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TboRepository);
//# sourceMappingURL=tbo.repository.js.map