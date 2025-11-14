import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { GenericRepo } from './generic-repo.utility';
export declare class SupplierLogUtility {
    private readonly configService;
    private readonly genericRepo;
    private readonly dataSource;
    private readonly supplierLogRepository;
    constructor(configService: ConfigService, genericRepo: GenericRepo, dataSource: DataSource);
    generateLogFile(logParams: any): Promise<void>;
    storeLogFile(fileName: any, logData: any, folderName: any): Promise<{
        filePath: string;
        storageType: string;
    }>;
    storeToS3(fileName: any, logData: any, folderName: any): Promise<{
        filePath: string;
        storageType: string;
    }>;
    storeToAzure(fileName: string, logData: any, folderName: string): Promise<{
        filePath: string;
        storageType: string;
    }>;
    storeLocally(fileName: any, logData: any, folderName: any): Promise<{
        filePath: string;
        storageType: string;
    }>;
    saveToSupplierLogTable(logId: any, title: any, searchReqId: any, bookingReferenceId: any, fileName: any, filePath: any, storageType: any): Promise<void>;
}
