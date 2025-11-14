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
exports.AirportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const airports_entity_1 = require("../../../shared/entities/airports.entity");
const typeorm_2 = require("typeorm");
const fs_1 = require("fs");
const path_1 = require("path");
let AirportService = class AirportService {
    airportRepository;
    constructor(airportRepository) {
        this.airportRepository = airportRepository;
    }
    async onApplicationBootstrap() {
        try {
            const filePath = (0, path_1.join)(process.cwd(), 'json', 'airport_en.json');
            if (!(0, fs_1.existsSync)(filePath)) {
                console.log('Airport JSON file not found. Creating from database...');
                await this.airportsJson();
                console.log('Airport JSON file generated successfully');
                return;
            }
            if (this.isJsonFileEmpty(filePath)) {
                console.log('Airport JSON file is empty. Regenerating from database...');
                await this.airportsJson();
                console.log('Airport JSON file regenerated successfully');
                return;
            }
            console.log('Airport JSON file already exists with data');
        }
        catch (error) {
            console.error('Failed to generate airport JSON file on application bootstrap:', error);
        }
    }
    async airportsJson() {
        const airports = await this.airportRepository.find();
        const airportObject = {};
        airports.forEach((airport) => {
            airportObject[airport.code] = {
                id: airport.id,
                name: airport.name,
                lat: airport.latitude,
                long: airport.longitude,
                code: airport.code,
                city: airport.city,
                country: airport.country,
                region: airport.state || '',
            };
        });
        const outputDir = (0, path_1.join)(process.cwd(), 'json');
        (0, fs_1.mkdirSync)(outputDir, { recursive: true });
        const filePath = (0, path_1.join)(outputDir, 'airport_en.json');
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(airportObject, null, 2));
        return airportObject;
    }
    isJsonFileEmpty(filePath) {
        try {
            const fileContent = (0, fs_1.readFileSync)(filePath, 'utf8').trim();
            if (!fileContent || fileContent.length === 0) {
                return true;
            }
            const parsedContent = JSON.parse(fileContent);
            return Object.keys(parsedContent).length === 0;
        }
        catch (error) {
            return true;
        }
    }
};
exports.AirportService = AirportService;
exports.AirportService = AirportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(airports_entity_1.Airports)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AirportService);
//# sourceMappingURL=airport.service.js.map