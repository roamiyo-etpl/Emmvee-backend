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
exports.AirlineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const airline_entity_1 = require("../../../shared/entities/airline.entity");
const typeorm_2 = require("typeorm");
const fs_1 = require("fs");
const path_1 = require("path");
let AirlineService = class AirlineService {
    airlineRepository;
    constructor(airlineRepository) {
        this.airlineRepository = airlineRepository;
    }
    async onApplicationBootstrap() {
        try {
            const filePath = (0, path_1.join)(process.cwd(), 'json', 'airline_en.json');
            if (!(0, fs_1.existsSync)(filePath)) {
                console.log('Airline JSON file not found. Creating from database...');
                await this.airlinesJson();
                console.log('Airline JSON file generated successfully');
                return;
            }
            if (this.isJsonFileEmpty(filePath)) {
                console.log('Airline JSON file is empty. Regenerating from database...');
                await this.airlinesJson();
                console.log('Airline JSON file regenerated successfully');
                return;
            }
            console.log('Airline JSON file already exists with data');
        }
        catch (error) {
            console.error('Failed to generate airline JSON file on application bootstrap:', error);
        }
    }
    async airlinesJson() {
        const airlines = await this.airlineRepository.find();
        const airlineObject = {};
        airlines.forEach((airline) => {
            airlineObject[airline.code] = airline.name;
        });
        const outputDir = (0, path_1.join)(process.cwd(), 'json');
        (0, fs_1.mkdirSync)(outputDir, { recursive: true });
        const filePath = (0, path_1.join)(outputDir, 'airline_en.json');
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(airlineObject, null, 2));
        return airlineObject;
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
exports.AirlineService = AirlineService;
exports.AirlineService = AirlineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(airline_entity_1.Airline)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AirlineService);
//# sourceMappingURL=airline.service.js.map