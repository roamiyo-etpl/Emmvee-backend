import { OnApplicationBootstrap } from '@nestjs/common';
import { Airline } from 'src/shared/entities/airline.entity';
import { Repository } from 'typeorm';
export declare class AirlineService implements OnApplicationBootstrap {
    private readonly airlineRepository;
    constructor(airlineRepository: Repository<Airline>);
    onApplicationBootstrap(): Promise<void>;
    airlinesJson(): Promise<Record<string, string>>;
    private isJsonFileEmpty;
}
