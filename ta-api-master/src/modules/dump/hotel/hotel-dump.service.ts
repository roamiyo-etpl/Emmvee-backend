import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { Http } from 'src/shared/utilities/flight/http.utility';
import { AmenityMasterEntity } from './entities/amenity-master.entity';
import { AmenityMappingEntity } from './entities/amenity-mapping.entity';
import { BoardCodeMasterEntity } from './entities/board-code-master.entity';
import { BoardCodeMappingEntity } from './entities/board-code-mapping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HotelAutocompleteDto } from './dtos/hotel-autocomplete.dto';
import { HotelAutocompleteInterface, HotelAutocompleteResponse } from './interfaces/hotel-response.interface';
import { CommonResponse } from 'src/shared/interfaces/common-response.interface';
import { HotelAmenity, HotelDetailResponse, HotelImageSizes, HotelPoi } from './interfaces/hotel-detail.interface';
import { TransferDataToHotelContent } from './dtos/transfer-data-to-hotel-content.dto';
import { SupplierCredService } from 'src/modules/generic/supplier-credientials/supplier-cred.service';
import { CountryEntity } from 'src/shared/entities/country.entity';
import { CityEntity } from 'src/shared/entities/city.entity';
import { HotelMasterEntity, HotelSourceEnum, StarRatingEnum } from 'src/shared/entities/hotel-master.entity';
import { TboHotelImagesEntity } from './entities/tbo-hotel-images.entity';
import { TboHotelAdditionalDetailsEntity } from './entities/tbo-hotel-additional-details.entity';
import { TboHotelContentEntity } from './entities/tbo-hotel-content.entity';
import { TboHotelRoomContentEntity } from './entities/tbo-hotel-room-content.entity';
import { EntityManager } from 'typeorm';
import { Cron } from '@nestjs/schedule';
/**
 * Hotel dump service - handles hotel data dump operations
 * @author Prashant - TBO Integration
 */
@Injectable()
export class HotelDumpService implements OnModuleInit {
    private readonly logger = new Logger(HotelDumpService.name);
    private terminalsCache: Map<string, any> = new Map();

    constructor(
        @InjectRepository(AmenityMasterEntity)
        private readonly amenityMasterRepository: Repository<AmenityMasterEntity>,
        @InjectRepository(AmenityMappingEntity)
        private readonly amenityMappingRepository: Repository<AmenityMappingEntity>,
        @InjectRepository(BoardCodeMasterEntity)
        private readonly boardCodeMasterRepository: Repository<BoardCodeMasterEntity>,
        @InjectRepository(BoardCodeMappingEntity)
        private readonly boardCodeMappingRepository: Repository<BoardCodeMappingEntity>,
        @InjectRepository(TboHotelAdditionalDetailsEntity)
        private readonly hotelDetailsRepository: Repository<TboHotelAdditionalDetailsEntity>,
        @InjectRepository(TboHotelImagesEntity)
        private readonly hotelImagesRepository: Repository<TboHotelImagesEntity>,
        @InjectRepository(TboHotelContentEntity)
        private readonly hotelContentRepository: Repository<TboHotelContentEntity>,
        @InjectRepository(TboHotelRoomContentEntity)
        private readonly hotelRoomContentRepository: Repository<TboHotelRoomContentEntity>,
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>,
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @InjectRepository(HotelMasterEntity)
        private readonly hotelMasterRepository: Repository<HotelMasterEntity>,
        private readonly supplierCredService: SupplierCredService,
    ) { }

    /**
     * Get hotel autocomplete suggestions
     * @param hotelAutocompleteDto - Search criteria
     * @returns Promise<HotelAutocompleteResponse> - Autocomplete suggestions
     */
    async getHotelAutocomplete(hotelAutocompleteDto: HotelAutocompleteDto): Promise<HotelAutocompleteResponse> {
        try {
            const { query: search, lat, long } = hotelAutocompleteDto;

            if (!search || search.trim().length < 2) {
                throw new BadRequestException('Search term must be at least 2 characters long');
            }

            const searchTerm = search.trim().toLowerCase();

            // Search hotels by name, city, or country
            const hotels = await this.hotelContentRepository
                .createQueryBuilder('hotel')
                .where('(LOWER(hotel.hotelName) LIKE :search OR LOWER(hotel.city) LIKE :search OR LOWER(hotel.country) LIKE :search)', { search: `%${searchTerm}%` })
                .orderBy('hotel.hotelName', 'ASC')
                .limit(10)
                .getMany();

            const suggestions: HotelAutocompleteInterface[] = hotels.map((hotel) => ({
                hotelCode: hotel.hotelCode,
                hotelName: hotel.hotelName,
                city: hotel.city,
                state: hotel.state,
                country: hotel.country,
                rating: hotel.rating,
                address: hotel.address,
                heroImage: hotel.heroImage,
            }));

            return {
                success: true,
                message: 'Hotel autocomplete suggestions retrieved successfully',
                data: suggestions,
                totalCount: suggestions.length,
            };
        } catch (error) {
            this.logger.error('Error in getHotelAutocomplete:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get hotel autocomplete suggestions');
        }
    }

    /**
     * Get hotel details by hotel code
     * @param hotelCode - Hotel code
     * @returns Promise<HotelDetailResponse> - Hotel details
     */
    async getHotelDetails(hotelCode: string): Promise<HotelDetailResponse> {
        try {
            if (!hotelCode) {
                throw new BadRequestException('Hotel code is required');
            }

            // Get basic hotel information


            const hotel = await this.hotelMasterRepository.findOne({
                where: { hotelCode },
            });

            const hotelContent = await this.hotelContentRepository.findOne({
                where: { hotelCode },
            });

            if (!hotel || !hotelContent) {
                throw new BadRequestException('Hotel not found');
            }



            // Get additional hotel details
            const additionalDetails = await this.hotelDetailsRepository.findOne({
                where: { hotelCode },
            });


            // Get hotel images (simplified for now)
            const images = await this.hotelImagesRepository.find({
                where: { hotelCode },
            });


            // ✅ Properly map DB HotelPoi records into HotelPoi objects
            const hotelPois: HotelPoi[] =
                additionalDetails?.interestPoints?.length
                    ? additionalDetails.interestPoints.map(poi => ({
                        name: poi,
                        distance: '',
                    }))
                    : [];


            // Get hotel amenities (simplified - return empty for now)

            const hotelAmenities: HotelAmenity[] =
                additionalDetails?.amenities?.length
                    ? additionalDetails.amenities.map(poi => ({
                        code: this.createAmenitiesCode(poi),
                        title: poi,
                        isPaid: false,
                    }))
                    : [];

            // ✅ Transform single heroImage string into HotelImageSizes format
            const hotelImages: HotelImageSizes[] = images.length > 0
            ? images.map(img => ({
                thumbnail: '',
                small: '',
                bigger: '',  // map DB column to interface property
                standard: img.url || '',         // map DB column to interface property
                xl: '',       // numeric order
                xxl: '',       // numeric order
                original: '', // convert to string if needed
            }))
            : [];




            // Get board codes (simplified - return empty for now)
            const boardCodes = [];

            // Process images (simplified for now)
            const processedImages: HotelImageSizes[] = [];

            return {
                hotelId: hotel.hotelCode,
                name: hotel.hotelName,
                address: hotelContent.address,
                phones: [],
                description: (hotel?.highlightText as unknown as string) || '',
                rating: {
                    stars: hotelContent.rating,
                    reviewScore: ''

                },
                location: {
                    geoLocation: {
                        latitude: hotelContent.latitude,
                        longitude: hotelContent.longitude,
                    },
                    city: hotelContent.city,
                    state: hotelContent.state,
                    country: additionalDetails?.country || '',
                    countryCode: hotelContent.countryCode,
                },
                images: hotelImages || [],
                amenities: hotelAmenities || [],
                poi: hotelPois || [],
                neighbourhoods: [],
            }
        } catch (error) {
            this.logger.error('Error in getHotelDetails:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get hotel details');
        }
    }

    /**
     * Transfer data to hotel content table
     * @param transferData - Data transfer request
     * @returns Promise<CommonResponse> - Transfer result
     */
    async transferDataToHotelContent(transferData: TransferDataToHotelContent): Promise<CommonResponse> {
        try {
            const { from, to } = transferData;

            if (!from || !to) {
                throw new BadRequestException('From and to values are required');
            }

            // This is a placeholder implementation
            // In a real scenario, you would implement the actual data transfer logic
            this.logger.log(`Transferring data from ${from} to ${to}`);

            return {
                success: true,
                message: `Data transfer from ${from} to ${to} completed successfully`,
            };
        } catch (error) {
            this.logger.error('Error in transferDataToHotelContent:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to transfer data');
        }
    }

    /**
     * Get hotel room content by hotel code
     * @param hotelCode - Hotel code
     * @returns Promise<any> - Room content
     */
    async getHotelRoomContent(hotelCode: string): Promise<any> {
        try {
            if (!hotelCode) {
                throw new BadRequestException('Hotel code is required');
            }

            const roomContent = await this.hotelRoomContentRepository.find({
                where: { hotelCode },
            });

            return {
                success: true,
                message: 'Hotel room content retrieved successfully',
                data: roomContent,
            };
        } catch (error) {
            this.logger.error('Error in getHotelRoomContent:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get hotel room content');
        }
    }

    /**
     * Bulk insert hotel content
     * @param hotelData - Array of hotel data
     * @returns Promise<CommonResponse> - Insert result
     */
    async bulkInsertHotelContent(hotelData: any[]): Promise<CommonResponse> {
        try {
            if (!hotelData || hotelData.length === 0) {
                throw new BadRequestException('Hotel data is required');
            }

            // Process and insert hotel data
            const processedData = hotelData.map((hotel) => ({
                hotelCode: hotel.hotelCode,
                hotelName: hotel.hotelName,
                rating: hotel.rating,
                latitude: hotel.latitude,
                longitude: hotel.longitude,
                address: hotel.address,
                city: hotel.city,
                state: hotel.state,
                country: hotel.country,
                cityCode: hotel.cityCode,
                stateCode: hotel.stateCode,
                countryCode: hotel.countryCode,
                pincode: hotel.pincode,
                heroImage: hotel.heroImage,
                hotelNameNormalized: hotel.hotelName?.toLowerCase().replace(/[^a-z0-9]/g, ''),
            }));

            await this.hotelContentRepository.save(processedData);

            return {
                success: true,
                message: `${processedData.length} hotel records inserted successfully`,
            };
        } catch (error) {
            this.logger.error('Error in bulkInsertHotelContent:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to insert hotel content');
        }
    }

    /**
     * Add country list dump from TBO API
     * @param headers - Request headers
     * @returns Promise<CommonResponse> - Dump result
     */
    async addCountryList(headers: Headers): Promise<CommonResponse> {
        try {
            this.logger.log('Starting country list dump from TBO API');

            // Get provider credentials
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');

            if (!tboProvider) {
                throw new BadRequestException('TBO provider not found');
            }
            console.log(tboProvider.provider_credentials, 'provider_credentials');

            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };

            console.log(auth);
            const endpoint = `${providerCredentials.dump_url}/CountryList`;

            // Fetch country list from TBO API
            const response = await Http.httpRequestTBOHotel('GET', endpoint, null, auth);
            console.log(response);

            if (!response.CountryList || !Array.isArray(response.CountryList)) {
                throw new BadRequestException('Invalid country list response from TBO API');
            }

            // Check if countries already exist
            const existingCountries = await this.countryRepository
                .createQueryBuilder('country')
                .where('country.iso2 IN (:...codes)', {
                    codes: response.CountryList.map((country) => country.Code),
                })
                .getMany();

            if (existingCountries.length > 0) {
                return {
                    success: true,
                    message: 'Country list already exists in database',
                };
            }

            // Prepare country entities
            const countryEntities = response.CountryList.map((country) => {
                const entity = new CountryEntity();
                entity.iso2 = country.Code;
                entity.countryName = country.Name;
                return entity;
            });

            // Save countries to database
            await this.countryRepository.save(countryEntities);

            this.logger.log(`Successfully added ${countryEntities.length} countries`);
            return {
                success: true,
                message: `Country list added successfully: ${countryEntities.length} countries`,
            };
        } catch (error) {
            this.logger.error('Error in addCountryList:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to add country list');
        }
    }

    /**
     * Add city list dump from TBO API
     * @param headers - Request headers
     * @returns Promise<CommonResponse> - Dump result
     */
    async addCityList(headers: Headers): Promise<CommonResponse> {
        try {
            this.logger.log('Starting city list dump from TBO API');

            // Get provider credentials
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');

            if (!tboProvider) {
                throw new BadRequestException('TBO provider not found');
            }

            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };
            const endpoint = `${providerCredentials.dump_url}/CityList`;

            // Check if cities already exist
            const citiesCount = await this.cityRepository.count();
            if (citiesCount > 0) {
                return {
                    success: true,
                    message: 'City list already exists in database',
                };
            }

            // Get all countries
            const countries = await this.countryRepository.find();
            let allCities: CityEntity[] = [];

            // Fetch cities for each country
            for (const country of countries) {
                try {
                    const response = await Http.httpRequestTBOHotel('POST', endpoint, { CountryCode: country.iso2 }, auth);

                    if (!response.CityList || !Array.isArray(response.CityList)) {
                        this.logger.warn(`No cities found for country ${country.iso2}`);
                        continue;
                    }

                    const cities = response.CityList.map((city) => {
                        const entity = new CityEntity();
                        entity.cityName = city.Name;
                        entity.cityCodeTbo = city.Code;
                        entity.countryId = country.countryId;
                        entity.countryCode = country.iso2 || '';
                        entity.countryName = country.countryName;
                        entity.stateId = 0; // Default state ID
                        entity.stateCode = ''; // Default state code
                        entity.stateName = ''; // Default state name
                        entity.latitude = 0; // Default latitude
                        entity.longitude = 0; // Default longitude
                        return entity;
                    });

                    allCities = allCities.concat(cities);
                } catch (error) {
                    this.logger.error(`Failed to fetch cities for country ${country.iso2}:`, error);
                    continue;
                }
            }

            if (allCities.length === 0) {
                throw new BadRequestException('No cities found in any API response');
            }

            // Save cities to database
            await this.cityRepository.save(allCities, { chunk: 100 });

            this.logger.log(`Successfully added ${allCities.length} cities`);
            return {
                success: true,
                message: `City list added successfully: ${allCities.length} cities`,
            };
        } catch (error) {
            this.logger.error('Error in addCityList:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to add city list');
        }
    }

    /**
     * Add hotel list dump from TBO API
     * @param headers - Request headers
     * @returns Promise<CommonResponse> - Dump result
     */
    // async addHotelList(headers: Headers): Promise<CommonResponse> {
    //     try {
    //         this.logger.log('Starting hotel list dump from TBO API');

    //         // Get provider credentials
    //         const providersData = await this.supplierCredService.getActiveProviders(headers);
    //         const tboProvider = providersData.find((p) => p.code === 'TBO');

    //         if (!tboProvider) {
    //             throw new BadRequestException('TBO provider not found');
    //         }

    //         const providerCredentials = JSON.parse(tboProvider.provider_credentials);
    //         const auth = {
    //                 username: providerCredentials.dump_username,
    //                 password: providerCredentials.dump_password,
    //         };
    //         const endpoint = `${providerCredentials.dump_url}/HotelCodeList`;

    //         // Fetch hotel codes from TBO API
    //         const response = await Http.httpRequestTBOHotel('GET', endpoint, null, auth);

    //         // console.log(response,"response");

    //         if (!response.HotelCodes || !Array.isArray(response.HotelCodes)) {
    //             throw new BadRequestException('Invalid hotel codes response from TBO API');
    //         }

    //         const hotelCodes = response.HotelCodes;

    //         // Check existing hotels in chunks to avoid parameter limits
    //         const chunkSize = 1000;
    //         let existingHotels: HotelMasterEntity[] = [];

    //         for (let i = 0; i < hotelCodes.length; i += chunkSize) {
    //             const chunk = hotelCodes.slice(i, i + chunkSize);
    //             const hotels = await this.hotelMasterRepository.createQueryBuilder('hotel').where('hotel.hotelCode IN (:...codes)', { codes: chunk }).select('hotel.hotelCode').getMany();
    //             existingHotels = existingHotels.concat(hotels);
    //         }

    //         const existingCodes = new Set(existingHotels.map((h) => h.hotelCode));
    //         const newHotelCodes = hotelCodes.filter((code: string) => !existingCodes.has(code));

    //         if (newHotelCodes.length === 0) {
    //             return {
    //                 success: true,
    //                 message: 'All hotel codes already exist in database',
    //             };
    //         }

    //         // Prepare hotel entities
    //         const hotelEntities = newHotelCodes.map((code: string) => {
    //             const entity = new HotelMasterEntity();
    //             entity.hotelCode = code;
    //             entity.hotelName = '';
    //             entity.providerCode = 'TBO';
    //             entity.isActive = true;
    //             entity.isDeleted = false;
    //             return entity;
    //         });

    //         // Save hotels to database
    //         await this.hotelMasterRepository.save(hotelEntities, { chunk: 100 });

    //         this.logger.log(`Successfully added ${hotelEntities.length} hotel codes`);
    //         return {
    //             success: true,
    //             message: `Hotel codes added successfully: ${hotelEntities.length} hotels`,
    //         };
    //     } catch (error) {
    //         this.logger.error('Error in addHotelList:', error);
    //         if (error instanceof BadRequestException) {
    //             throw error;
    //         }
    //         throw new InternalServerErrorException('Failed to add hotel list');
    //     }
    // }

    async addHotelList(headers: Headers): Promise<CommonResponse> {
        try {
            this.logger.log('Starting hotel list dump from TBO API');

            // Get provider credentials
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');
            if (!tboProvider) throw new BadRequestException('TBO provider not found');

            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };

            // const cityCode = '130443'; // Delhi
            const cityCode = '115936'; // Dubai


            // Step 1: Get hotel codes by city
            const listEndpoint = `${providerCredentials.dump_url}/TBOHotelCodeList`;
            const hotelListResponse = await Http.httpRequestTBOHotel('POST', listEndpoint, { CityCode: cityCode }, auth);
            if (!hotelListResponse.Hotels || !Array.isArray(hotelListResponse.Hotels)) {
                throw new BadRequestException('Invalid hotel codes response from TBO API');
            }

            const Hotels = hotelListResponse.Hotels;

            // Step 2: Check which hotels already exist to avoid duplicates
            const chunkSize = 1000;
            let existingHotels: HotelMasterEntity[] = [];

            for (let i = 0; i < Hotels.length; i += chunkSize) {
                const chunk = Hotels.slice(i, i + chunkSize).map((h) => h.HotelCode);
                const hotels = await this.hotelMasterRepository.createQueryBuilder('hotel').where('hotel.hotelCode IN (:...codes)', { codes: chunk }).select('hotel.hotelCode').getMany();

                existingHotels = existingHotels.concat(hotels);
            }

            const existingCodes = new Set(existingHotels.map((h) => h.hotelCode));
            const newHotels = Hotels.filter((h) => !existingCodes.has(h.HotelCode));

            if (newHotels.length === 0) {
                return { success: true, message: 'All hotel codes already exist in database' };
            }

            // Step 3: For each new hotel, fetch detailed info in parallel
            const detailEndpoint = `${providerCredentials.dump_url}/Hoteldetails`;

            const detailedResponses = await Promise.all(newHotels.map((hotel) => Http.httpRequestTBOHotel('POST', detailEndpoint, { Hotelcodes: hotel.HotelCode }, auth)));

            // Step 4: Prepare entities from detailed info
            const hotelEntities: HotelMasterEntity[] = [];
            const hotelContentEntities: TboHotelContentEntity[] = [];
            const hotelAdditionalDetailsEntities: TboHotelAdditionalDetailsEntity[] = [];
            const hotelImagesEntities: TboHotelImagesEntity[] = [];

            for (const detailResp of detailedResponses) {
                if (detailResp.HotelDetails && detailResp.HotelDetails.length > 0) {
                    const detail = detailResp.HotelDetails[0];

                    const entity = new HotelMasterEntity();
                    entity.hotelCode = detail.HotelCode;
                    entity.hotelName = detail.HotelName || '';
                    entity.highlightText = detail.Description || '';
                    entity.address = detail.Address || '';
                    entity.city = detail.CityName || '';
                    entity.countryCode = detail.CountryCode || '';
                    entity.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    entity.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    entity.starRating = detail.HotelRating || null;
                    entity.providerCode = 'TBO';
                    entity.hotelSource = HotelSourceEnum.TBO;
                    entity.isActive = true;
                    entity.isDeleted = false;
                    entity.createdAt = new Date();
                    // add more fields as needed

                    hotelEntities.push(entity);


                    const hotelContent = new TboHotelContentEntity();
                    hotelContent.hotelCode = detail.HotelCode;
                    hotelContent.hotelName = detail.HotelName || '';
                    hotelContent.address = detail.Address || '';
                    hotelContent.city = detail.CityName || '';
                    hotelContent.cityCode = cityCode;
                    hotelContent.countryCode = detail.CountryCode || '';
                    hotelContent.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    hotelContent.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    hotelContent.rating = detail.HotelRating || null;

                    // add more fields as needed

                    hotelContentEntities.push(hotelContent);


                    // Create HotelAdditionalDetailsEntity to hold additional hotel details
                    const additionalDetail = new TboHotelAdditionalDetailsEntity();

                    additionalDetail.hotelCode = detail.HotelCode;
                    additionalDetail.supplierCode = 'TBO'; // Assuming you have a supplier code
                    additionalDetail.hotelName = detail.HotelName || '';
                    additionalDetail.rating = detail.HotelRating || null;
                    additionalDetail.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    additionalDetail.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    additionalDetail.address = detail.Address || '';
                    additionalDetail.city = detail.CityName || '';
                    additionalDetail.state = '';  // Set to empty or pull from detail if available
                    additionalDetail.country = detail.CountryName || '';
                    additionalDetail.cityCode = cityCode; // Assuming you might pull this from elsewhere
                    additionalDetail.stateCode = ''; // Assuming you might pull this from elsewhere
                    additionalDetail.countryCode = detail.CountryCode || '';
                    additionalDetail.pincode = detail.PinCode || ''; // Pin code from the API response
                    additionalDetail.heroImage = detail.Image || ''; // Set the image as heroImage
                    additionalDetail.amenities = detail.HotelFacilities || []; // Map HotelFacilities to amenities
                    additionalDetail.description = detail.description; // Add hotel descriptions if available
                    additionalDetail.hotelEmail = detail.Email || ''; // Add hotel email if available
                    additionalDetail.hotelPhones = detail.PhoneNumber ? [detail.PhoneNumber] : []; // Add phone numbers if available
                    additionalDetail.boardCodes = []; // Add board codes if available
                    additionalDetail.websiteUrl = detail.HotelWebsiteUrl || ''; // Hotel website URL
                    additionalDetail.interestPoints = detail.Attractions ? Object.values(detail.Attractions) : []; // Attractions as interest points
                    additionalDetail.terminals = []; // Add terminals if available
                    additionalDetail.createdAt = new Date();
                    additionalDetail.updatedAt = new Date();
                    additionalDetail.hotelVector = ''; // You might generate this or set it based on your data
                    additionalDetail.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;

                    hotelAdditionalDetailsEntities.push(additionalDetail);



                    // --- HOTEL IMAGES ---
                    if (detail.Images && Array.isArray(detail.Images)) {
                        let order = 1;
                        for (const imgUrl of detail.Images) {
                            const imageEntity = new TboHotelImagesEntity();
                            imageEntity.hotelCode = detail.HotelCode;
                            imageEntity.supplierCode = 'TBO';
                            imageEntity.typeCode = 'EXTERIOR'; // or extract from API if available
                            imageEntity.typeName = ''; //
                            imageEntity.roomCode = '';
                            imageEntity.roomType = '';
                            imageEntity.url = imgUrl;
                            imageEntity.order = order++;
                            imageEntity.visualOrder = order;
                            imageEntity.createdAt = new Date();
                            imageEntity.updatedAt = new Date();

                            hotelImagesEntities.push(imageEntity);
                        }
                    }
                }
            }

            // Step 5: Save entities in chunks to DB
            await this.hotelMasterRepository.save(hotelEntities, { chunk: 100 });
            await this.hotelContentRepository.save(hotelContentEntities, { chunk: 100 });
            await this.hotelDetailsRepository.save(hotelAdditionalDetailsEntities, { chunk: 100 });
            await this.hotelImagesRepository.save(hotelImagesEntities, { chunk: 100 });

            this.logger.log(`Successfully added ${hotelEntities.length} hotels with full details`);

            return {
                success: true,
                message: `Hotel details added successfully: ${hotelEntities.length} hotels`,
            };
        } catch (error) {
            this.logger.error('Error in addHotelList:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to add hotel list');
        }
    }



    async addHotelListProduction(headers: Headers): Promise<CommonResponse> {
        let successfullyProcessedHotels = 0;

        try {
            this.logger.log('Starting hotel list dump from TBO API');

            // Get provider credentials
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find((p) => p.code === 'TBO');
            if (!tboProvider) throw new BadRequestException('TBO provider not found');

            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };

            const cityCode = '115936'; // Dubai

            // Step 1: Get hotel codes by city
            const listEndpoint = `${providerCredentials.dump_url}/hotelcodelist`;
            const hotelListResponse = await Http.httpRequestTBOHotel('GET', listEndpoint, '', auth);
            if (!hotelListResponse.HotelCodes || !Array.isArray(hotelListResponse.HotelCodes)) {
                throw new BadRequestException('Invalid hotel codes response from TBO API');
            }

            const hotelCodes = hotelListResponse.HotelCodes;

            // Step 2: Check which hotels already exist to avoid duplicates
            const chunkSize = 1000;
            let existingHotels: HotelMasterEntity[] = [];

            for (let i = 0; i < hotelCodes.length; i += chunkSize) {
                const chunk = hotelCodes.slice(i, i + chunkSize);
                const hotels = await this.hotelMasterRepository.createQueryBuilder('hotel').where('hotel.hotelCode IN (:...codes)', { codes: chunk }).select('hotel.hotelCode').getMany();
                existingHotels = existingHotels.concat(hotels);
            }

            const existingCodes = new Set(existingHotels.map((h) => h.hotelCode));
            const newHotels = hotelCodes.filter((code) => !existingCodes.has(code));

            if (newHotels.length === 0) {
                return { success: true, message: 'All hotel codes already exist in database' };
            }

            // Step 3: Fetch hotel details in batches of 100
            const batchSize = 100;
            const detailEndpoint = `${providerCredentials.dump_url}/Hoteldetails`;

            // Fetch hotel details in batches
            const fetchHotelDetailsInBatches = async (): Promise<any[]> => {
                const hotelDetails: any[] = [];
                for (let i = 0; i < newHotels.length; i += batchSize) {
                    const batch = newHotels.slice(i, i + batchSize);
                    try {
                        const batchResponses = await Promise.all(batch.map(code =>
                            Http.httpRequestTBOHotel('POST', detailEndpoint, { Hotelcodes: code }, auth)
                        ));
                        hotelDetails.push(...batchResponses);
                        console.log(`Batch processed: ${batch.length} hotels`);
                    } catch (error) {
                        // If batch fails, log the failure and continue with the next
                        this.logger.error(`Failed to fetch batch for hotel codes ${batch.join(', ')}`, error);
                        continue;
                    }
                }
                // console.log(hotelDetails,"hotelDetails");
                return hotelDetails;
            };

            const detailedResponses = await fetchHotelDetailsInBatches();
            console.log(detailedResponses, "hotelDetails");

            // Step 4: Prepare entities from hotel details
            const hotelEntities: HotelMasterEntity[] = [];
            const hotelContentEntities: TboHotelContentEntity[] = [];
            const hotelAdditionalDetailsEntities: TboHotelAdditionalDetailsEntity[] = [];
            const hotelImagesEntities: TboHotelImagesEntity[] = [];

            // Step 5: Handle the data in batches and commit each batch into the database fully
            for (const detailResp of detailedResponses) {
                console.log(detailResp)
                if (detailResp.HotelDetails && detailResp.HotelDetails.length > 0) {
                    const detail = detailResp.HotelDetails[0];
                    console.log(detail, "details");

                    // Create HotelMasterEntity
                    const hotelEntity = new HotelMasterEntity();
                    hotelEntity.hotelCode = detail.HotelCode;
                    hotelEntity.hotelName = detail.HotelName || '';
                    hotelEntity.highlightText = detail.Description || '';
                    hotelEntity.address = detail.Address || '';
                    hotelEntity.city = detail.CityName || '';
                    hotelEntity.countryCode = detail.CountryCode || '';
                    hotelEntity.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    hotelEntity.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    hotelEntity.starRating = detail.HotelRating || null;
                    hotelEntity.providerCode = 'TBO';
                    hotelEntity.hotelSource = HotelSourceEnum.TBO;
                    hotelEntity.isActive = true;
                    hotelEntity.isDeleted = false;
                    hotelEntity.createdAt = new Date();
                    hotelEntities.push(hotelEntity);

                    // TboHotelContentEntity
                    const hotelContent = new TboHotelContentEntity();
                    hotelContent.hotelCode = detail.HotelCode;
                    hotelContent.hotelName = detail.HotelName || '';
                    hotelContent.address = detail.Address || '';
                    hotelContent.city = detail.CityName || '';
                    hotelContent.cityCode = cityCode;
                    hotelContent.countryCode = detail.CountryCode || '';
                    hotelContent.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    hotelContent.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    hotelContent.rating = detail.HotelRating || null;
                    hotelContentEntities.push(hotelContent);

                    // TboHotelAdditionalDetailsEntity
                    const additionalDetail = new TboHotelAdditionalDetailsEntity();
                    additionalDetail.hotelCode = detail.HotelCode;
                    additionalDetail.supplierCode = 'TBO';
                    additionalDetail.hotelName = detail.HotelName || '';
                    additionalDetail.rating = detail.HotelRating || null;
                    additionalDetail.latitude = detail.Map ? detail.Map.split('|')[0] : null;
                    additionalDetail.longitude = detail.Map ? detail.Map.split('|')[1] : null;
                    additionalDetail.address = detail.Address || '';
                    additionalDetail.city = detail.CityName || '';
                    additionalDetail.state = '';
                    additionalDetail.country = detail.CountryName || '';
                    additionalDetail.cityCode = cityCode;
                    additionalDetail.stateCode = '';
                    additionalDetail.countryCode = detail.CountryCode || '';
                    additionalDetail.pincode = detail.PinCode || '';
                    additionalDetail.heroImage = detail.Image || '';
                    additionalDetail.amenities = detail.HotelFacilities || [];
                    additionalDetail.description = detail.Description;
                    additionalDetail.hotelEmail = detail.Email || '';
                    additionalDetail.hotelPhones = detail.PhoneNumber ? [detail.PhoneNumber] : [];
                    additionalDetail.websiteUrl = detail.HotelWebsiteUrl || '';
                    additionalDetail.interestPoints = detail.Attractions ? Object.values(detail.Attractions) : [];
                    additionalDetail.terminals = [];
                    additionalDetail.createdAt = new Date();
                    additionalDetail.updatedAt = new Date();
                    additionalDetail.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;
                    hotelAdditionalDetailsEntities.push(additionalDetail);

                    // Hotel Images
                    if (detail.Images && Array.isArray(detail.Images)) {
                        let order = 1;
                        for (const imgUrl of detail.Images) {
                            const imageEntity = new TboHotelImagesEntity();
                            imageEntity.hotelCode = detail.HotelCode;
                            imageEntity.supplierCode = 'TBO';
                            imageEntity.typeCode = 'EXTERIOR';
                            imageEntity.url = imgUrl;
                            imageEntity.order = order++;
                            imageEntity.visualOrder = order;
                            imageEntity.createdAt = new Date();
                            imageEntity.updatedAt = new Date();
                            hotelImagesEntities.push(imageEntity);
                        }
                    }

                    successfullyProcessedHotels++;
                }

                // Start transaction for each batch
                const entityManager: EntityManager = this.hotelMasterRepository.manager;

                await entityManager.transaction(async (transactionalEntityManager) => {
                    try {
                        // Save HotelMasterEntity batch
                        await transactionalEntityManager.save(HotelMasterEntity, hotelEntities);
                        console.log(`Batch processed successfully: ${hotelEntities.length} hotels`);

                        // Save related entities after committing the master entity save
                        await transactionalEntityManager.save(TboHotelContentEntity, hotelContentEntities);
                        await transactionalEntityManager.save(TboHotelAdditionalDetailsEntity, hotelAdditionalDetailsEntities);
                        await transactionalEntityManager.save(TboHotelImagesEntity, hotelImagesEntities);

                        console.log(`Successfully saved related entities for this batch`);

                        // Clear entities after each batch to prepare for the next batch
                        hotelEntities.length = 0;
                        hotelContentEntities.length = 0;
                        hotelAdditionalDetailsEntities.length = 0;
                        hotelImagesEntities.length = 0;
                    } catch (error) {
                        this.logger.error('Error during transaction commit:', error);
                        throw new Error('Transaction failed');
                    }
                });

                console.log(`Batch of 100 hotels committed successfully.`);
            }

            return {
                success: true,
                message: `Hotel details added successfully: ${successfullyProcessedHotels} hotels`,
            };

        } catch (error) {
            this.logger.error('Error in addHotelList:', error);
            throw new InternalServerErrorException('Failed to add hotel list');
        }
    }

    // 🧠 Automatically runs when app/module loads
    // async onModuleInit() {
    //     this.logger.log('⏳ HotelMasterService initialized — starting auto hotel sync...');
    //     await this.syncAllHotelCodes();
    // }

    // async syncAllHotelCodes(): Promise<void> {
    //     this.logger.log('🚀 Starting full hotel code sync...');

    //     try {
    //         this.logger.log('Starting hotel list dump from TBO API');
    //         const headers = {}

    //         // 🔹 Step 1: Get provider credentials
    //         const providersData = await this.supplierCredService.getActiveProviders(headers);
    //         const tboProvider = providersData.find((p) => p.code === 'TBO');
    //         if (!tboProvider) throw new BadRequestException('TBO provider not found');

    //         const providerCredentials = JSON.parse(tboProvider.provider_credentials);

    //         const auth = {
    //             username: providerCredentials.dump_username,
    //             password: providerCredentials.dump_password,
    //         };
    //         // console.log(auth)

    //         // 🔹 Step 3: Get hotel codes from TBO API
    //         const listEndpoint = `${providerCredentials.dump_url}/hotelcodelist`;
    //         const hotelListResponse = await Http.httpRequestTBOHotel('GET', listEndpoint, '', auth);

    //         if (!hotelListResponse.HotelCodes || !Array.isArray(hotelListResponse.HotelCodes)) {
    //             throw new BadRequestException('Invalid hotel codes response from TBO API');
    //         }

    //         const hotelCodes: (number | string)[] = hotelListResponse.HotelCodes;
    //         this.logger.log(`📦 Received ${hotelCodes.length} hotel codes from API`);

    //         // 🧠 Fetch existing codes once (for deduplication before insert)
    //         const existingCodes = new Set(
    //             (await this.hotelMasterRepository.find({ select: ['hotelCode'] })).map((h) => h.hotelCode),
    //         );

    //         const newCodes = hotelCodes.filter((code) => !existingCodes.has(String(code)));
    //         this.logger.log(
    //             `🧾 Skipping ${existingCodes.size} existing codes, inserting ${newCodes.length} new ones.`,
    //         );

    //         if (!newCodes.length) {
    //             this.logger.log('✅ No new codes to insert. Sync complete.');
    //             return;
    //         }

    //         if (!hotelCodes.length) return;

    //         // 🔹 Step 4: Insert in Chunks
    //         const chunkSize = 5000;
    //         let totalInserted = 0;

    //         for (let i = 0; i < newCodes.length; i += chunkSize) {
    //             const chunk = newCodes.slice(i, i + chunkSize);

    //             try {
    //                 const hotelEntities = chunk.map((code) =>
    //                     this.hotelMasterRepository.create({
    //                         hotelCode: String(code),
    //                         hotelSource: HotelSourceEnum.TBO,
    //                         createdAt: new Date(),
    //                     }),
    //                 );

    //                 await this.hotelMasterRepository
    //                     .createQueryBuilder()
    //                     .insert()
    //                     .into(HotelMasterEntity)
    //                     .values(hotelEntities)
    //                     .onConflict(`("hotel_code") DO NOTHING`)
    //                     .execute();

    //                 totalInserted += hotelEntities.length;
    //                 this.logger.log(`✅ Inserted ${i + chunk.length} / ${hotelCodes.length}`);
    //             } catch (chunkError) {
    //                 this.logger.error(`❌ Error inserting chunk ${i} - ${(chunkError as Error).message}`);
    //             }
    //         }

    //         this.logger.log(`🏁 All hotel codes synced successfully. Total inserted: ${totalInserted}`);

    //     } catch (error) {
    //         // 🔹 Step 6: Handle API or logic-level errors
    //         this.logger.error(`❌ Failed to sync hotel codes: ${(error as Error).message}`, (error as Error).stack);
    //         // throw new InternalServerErrorException('Failed to add hotel list');
    //     }
    // }




    // 🔹 Automatically runs once when the app/module starts
    async onModuleInit() {
        this.logger.log('🏁 HotelMasterService initialized — running initial sync...');
        // await this.safeSyncSequence();
    }

    // 🕑 CRON JOB — Runs automatically every day at 2:00 AM (IST)
    @Cron('0 2 * * *', { timeZone: 'Asia/Kolkata' })
    async handleDailyHotelSync(): Promise<void> {
        this.logger.log('🌙 Daily hotel sync started at 2:00 AM...');
        // await this.safeSyncSequence();
    }

    // 🔹 Safe wrapper to handle sequence with error protection
    private async safeSyncSequence() {
        try {
            await this.syncAllHotelCodes();
            await this.syncInactiveHotelsFromDB();
            this.logger.log('✅ Hotel auto-sync sequence complete');
        } catch (error) {
            this.logger.error(`❌ Sync sequence failed: ${(error as Error).message}`);
        }
    }


    // 🔹 Step 1: Fetch all hotel codes from TBO and insert new ones
    async syncAllHotelCodes(): Promise<void> {
        this.logger.log('🚀 Starting full hotel code sync...');
        try {
            const headers = {
                providerCode: 'TBO',
                moduleType: 'Hotel',
            }
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find(p => p.code === 'TBO');
            if (!tboProvider) throw new BadRequestException('TBO provider not found');

            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };

            const listEndpoint = `${providerCredentials.dump_url}/hotelcodelist`;
            const hotelListResponse = await Http.httpRequestTBOHotel('GET', listEndpoint, '', auth);

            if (!hotelListResponse.HotelCodes || !Array.isArray(hotelListResponse.HotelCodes))
                throw new BadRequestException('Invalid hotel codes response from TBO API');

            const hotelCodes: (number | string)[] = hotelListResponse.HotelCodes;
            this.logger.log(`📦 Received ${hotelCodes.length} hotel codes`);

            const existingCodes = new Set(
                (await this.hotelMasterRepository.find({ select: ['hotelCode'] }))
                    .map(h => h.hotelCode),
            );

            const newCodes = hotelCodes.filter(code => !existingCodes.has(String(code)));
            this.logger.log(`🧾 ${existingCodes.size} existing codes skipped, ${newCodes.length} new to insert`);

            if (!newCodes.length) {
                this.logger.log('✅ No new codes to insert. Sync complete.');
                return;
            }

            const chunkSize = 5000;
            let totalInserted = 0;

            for (let i = 0; i < newCodes.length; i += chunkSize) {
                const chunk = newCodes.slice(i, i + chunkSize);
                const entities = chunk.map(code => this.hotelMasterRepository.create({
                    hotelCode: String(code),
                    hotelSource: HotelSourceEnum.TBO,
                    createdAt: new Date(),
                    isActive: false, // 👈 default inactive until details synced
                }));

                await this.hotelMasterRepository
                    .createQueryBuilder()
                    .insert()
                    .into(HotelMasterEntity)
                    .values(entities)
                    .onConflict(`("hotel_code") DO NOTHING`)
                    .execute();

                totalInserted += entities.length;
                this.logger.log(`✅ Inserted ${i + chunk.length} / ${hotelCodes.length}`);
            }

            this.logger.log(`🏁 Hotel codes synced. Total inserted: ${totalInserted}`);
        } catch (error) {
            this.logger.error(`❌ Failed to sync hotel codes: ${error.message}`, error.stack);
        }
    }

    // 🔹 Step 2: Process inactive hotels (from DB) and fetch their details
    async syncInactiveHotelsFromDB(): Promise<void> {
        this.logger.log('🚀 Starting inactive hotel sync...');
        try {
            const headers = {
                providerCode: 'TBO',
                moduleType: 'Hotel',
            }
            const providersData = await this.supplierCredService.getActiveProviders(headers);
            const tboProvider = providersData.find(p => p.code === 'TBO');
            if (!tboProvider) throw new BadRequestException('TBO provider not found');

            const providerCredentials = JSON.parse(tboProvider.provider_credentials);
            const auth = {
                username: providerCredentials.dump_username,
                password: providerCredentials.dump_password,
            };

            const detailEndpoint = `${providerCredentials.dump_url}/Hoteldetails`;
            const inactiveHotels = await this.hotelMasterRepository.find({
                where: { isActive: false },
                select: ['hotelCode'],
                take: 2000,
            });

            if (!inactiveHotels.length) {
                this.logger.log('✅ No inactive hotels found.');
                return;
            }

            this.logger.log(`📦 Found ${inactiveHotels.length} inactive hotels to process`);

            for (const h of inactiveHotels) {
                try {
                    await this.updateSingleHotelFromTBO(h.hotelCode, detailEndpoint, auth);
                } catch (e) {
                    this.logger.error(`❌ Failed hotel ${h.hotelCode}: ${e.message}`);
                }
            }

            this.logger.log('🏁 Inactive hotel sync complete');
        } catch (error) {
            this.logger.error(`❌ Inactive hotel sync failed: ${error.message}`);
        }
    }

    // 🔹 Step 3: Update one hotel and its child entities
    private async updateSingleHotelFromTBO(
        hotelCode: string,
        endpoint: string,
        auth: any,
    ): Promise<void> {
        const detailResp = await Http.httpRequestTBOHotel('POST', endpoint, { Hotelcodes: hotelCode }, auth);
        if (!detailResp?.HotelDetails?.length) {
            this.logger.warn(`⚠️ No details found for hotel ${hotelCode}`);
            return;
        }

        const detail = detailResp.HotelDetails[0];

        await this.hotelMasterRepository.update(
            { hotelCode },
            {
                hotelName: detail.HotelName || '',
                highlightText: detail.Description || '',
                address: detail.Address || '',
                city: detail.CityName || '',
                postalCode: detail.PinCode || '',
                countryCode: detail.CountryCode.toUpperCase() || '',
                heroImage: detail.Image,
                latitude: detail.Map ? detail.Map.split('|')[0] : null,
                longitude: detail.Map ? detail.Map.split('|')[1] : null,
                starRating: detail.HotelRating || null,
                providerCode: 'TBO',
                isActive: true,
                updatedAt: new Date(),
            },
        );

        // Update related child tables
        const hotelContent = new TboHotelContentEntity();

        hotelContent.hotelCode = detail.HotelCode;
        hotelContent.hotelName = detail.HotelName || '';
        hotelContent.address = detail.Address || '';
        hotelContent.city = detail.CityName || '';
        hotelContent.cityCode = detail.CityId || '';
        hotelContent.countryCode = detail.CountryCode.toUpperCase() || '';
        hotelContent.country = detail.CountryName || ''
        hotelContent.pincode = detail.PinCode || ''
        hotelContent.latitude = detail.Map ? detail.Map.split('|')[0] : null;
        hotelContent.longitude = detail.Map ? detail.Map.split('|')[1] : null;
        hotelContent.rating = detail.HotelRating || null;
        hotelContent.heroImage = detail.Image || null;
        hotelContent.rating = detail.HotelRating || null;
        hotelContent.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;

        await this.hotelMasterRepository.manager.save(hotelContent);

        const additional = new TboHotelAdditionalDetailsEntity();

        additional.hotelName = detail.HotelName || '';
        additional.hotelCode = detail.HotelCode;
        additional.supplierCode = 'TBO';
        additional.address = detail.Address || '';
        additional.city = detail.CityName || '';
        additional.country = detail.CountryName || '';
        additional.countryCode = detail.CountryCode || '';
        additional.rating = detail.HotelRating || null;
        additional.latitude = detail.Map ? detail.Map.split('|')[0] : null;
        additional.longitude = detail.Map ? detail.Map.split('|')[1] : null;
        additional.address = detail.Address || '';
        additional.city = detail.CityName || '';
        additional.cityCode = detail.CityId || '';
        additional.state = '';  // Set to empty or pull from detail if available
        additional.stateCode = ''; // Assuming you might pull this from elsewhere
        additional.countryCode = detail.CountryCode || '';
        additional.pincode = detail.PinCode || ''; // Pin code from the API response
        additional.heroImage = detail.Image || ''; // Set the image as heroImage
        additional.amenities = detail.HotelFacilities || []; // Map HotelFacilities to amenities
        additional.description = detail.Description; // Add hotel descriptions if available
        additional.hotelEmail = detail.Email || ''; // Add hotel email if available
        additional.hotelPhones = detail.PhoneNumber ? [detail.PhoneNumber] : []; // Add phone numbers if available
        additional.boardCodes = []; // Add board codes if available         
        additional.hotelEmail = detail.Email || '';
        additional.websiteUrl = detail.HotelWebsiteUrl || ''; // Hotel website URL
        additional.interestPoints = detail.Attractions ? Object.values(detail.Attractions) : []; // Attractions as interest points
        additional.terminals = []; // Add terminals if available
        additional.createdAt = new Date();
        additional.updatedAt = new Date();
        additional.hotelVector = ''; // You might generate this or set it based on your data
        additional.hotelNameNormalized = detail.HotelName?.toLowerCase() || null;

        await this.hotelMasterRepository.manager.save(additional);

        await this.hotelMasterRepository.manager.delete(TboHotelImagesEntity, { hotelCode });
        if (Array.isArray(detail.Images)) {
            const images = detail.Images.map((url, i) => ({
                hotelCode,
                supplierCode: 'TBO',
                typeCode: 'EXTERIOR',
                url,
                order: i + 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            await this.hotelMasterRepository.manager.save(TboHotelImagesEntity, images);
        }

        this.logger.log(`✅ Hotel ${hotelCode} fully updated`);
    }


    private createAmenitiesCode(name) {
        return name
            .trim()                // remove spaces at start/end
            .toLowerCase()         // make it lowercase
            .replace(/\s+/g, '_')  // replace spaces with underscores
            .replace(/[^a-z0-9_]/g, ''); // remove non-alphanumeric characters
    }
}




