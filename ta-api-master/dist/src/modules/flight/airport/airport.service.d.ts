import { OnApplicationBootstrap } from '@nestjs/common';
import { Airports } from 'src/shared/entities/airports.entity';
import { Repository } from 'typeorm';
export declare class AirportService implements OnApplicationBootstrap {
    private readonly airportRepository;
    constructor(airportRepository: Repository<Airports>);
    onApplicationBootstrap(): Promise<void>;
    airportsJson(): Promise<Record<string, any>>;
    private isJsonFileEmpty;
}
