import { ConfigService } from '@nestjs/config';
import { GenericRepo } from './generic-repo.utility';
export declare class s3BucketService {
    private configService;
    private genericRepo;
    constructor(configService: ConfigService, genericRepo: GenericRepo);
    transferFlightLogsToS3(logPath: any, bucketPath: any): Promise<void>;
    generateS3LogFile(fileName: any, logData: any, folderName: any): Promise<void>;
    generateS3LogFileHotel(fileName: any, logData: any, folderName: any): Promise<void>;
}
