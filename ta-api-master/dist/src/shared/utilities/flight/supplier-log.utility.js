"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierLogUtility = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const client_s3_1 = require("@aws-sdk/client-s3");
const path = __importStar(require("path"));
const supplier_log_flight_entity_1 = require("../../entities/supplier-log-flight.entity");
const generic_utility_1 = require("./generic.utility");
const generic_repo_utility_1 = require("./generic-repo.utility");
const storage_blob_1 = require("@azure/storage-blob");
let SupplierLogUtility = class SupplierLogUtility {
    configService;
    genericRepo;
    dataSource;
    supplierLogRepository;
    constructor(configService, genericRepo, dataSource) {
        this.configService = configService;
        this.genericRepo = genericRepo;
        this.dataSource = dataSource;
        this.supplierLogRepository = this.dataSource.getRepository(supplier_log_flight_entity_1.SupplierLogFlight);
    }
    async generateLogFile(logParams) {
        const { fileName, logData, folderName, logId, title, searchReqId, bookingReferenceId } = logParams;
        const { filePath, storageType } = await this.storeLogFile(fileName, logData, folderName);
        if (filePath && title && searchReqId) {
            await this.saveToSupplierLogTable(logId, title, searchReqId, bookingReferenceId, fileName, filePath, storageType);
        }
    }
    async storeLogFile(fileName, logData, folderName) {
        let filePath = '';
        let storageType = '';
        await this.storeLocally(fileName, logData, folderName);
        const result = await this.storeToAzure(fileName, logData, folderName);
        filePath = result.filePath;
        storageType = result.storageType;
        return { filePath, storageType };
    }
    async storeToS3(fileName, logData, folderName) {
        const bucketPath = 'logs/flight_logs/' + folderName + '/';
        let filePath = '';
        let storageType = '';
        try {
            const AWSCredentials = {
                accessKey: this.configService.get('s3.accesskey'),
                secret: this.configService.get('s3.secretKey'),
                bucketName: this.configService.get('s3.bucketName'),
                region: this.configService.get('s3.awsRegion'),
            };
            const s3Client = new client_s3_1.S3Client({
                region: AWSCredentials.region,
                credentials: {
                    accessKeyId: AWSCredentials.accessKey,
                    secretAccessKey: AWSCredentials.secret,
                },
            });
            const params = {
                Bucket: AWSCredentials.bucketName,
                Body: JSON.stringify(logData),
                Key: bucketPath + fileName + '.json',
                ACL: client_s3_1.ObjectCannedACL.public_read,
                ContentType: 'text/html',
            };
            const command = new client_s3_1.PutObjectCommand(params);
            try {
                await s3Client.send(command);
                filePath = `${this.configService.get('s3.cloudfrontUrl')}/${bucketPath}${fileName}.json`;
                storageType = 's3';
            }
            catch (err) {
                console.log(err);
                this.genericRepo.storeLogs('', 1, err, 0);
            }
        }
        catch (error) {
            console.log(error);
            this.genericRepo.storeLogs('', 1, error, 0);
        }
        return { filePath, storageType };
    }
    async storeToAzure(fileName, logData, folderName) {
        const folderPath = `logs/flight_logs/${folderName}/`;
        let filePath = '';
        let storageType = '';
        try {
            const sasUrl = this.configService.get('azure.blob_sas_link');
            if (!sasUrl)
                throw new Error('Azure Blob SAS link missing in configuration.');
            const blobServiceClient = new storage_blob_1.BlobServiceClient(sasUrl);
            const url = new URL(sasUrl);
            const containerName = url.pathname.replace('/', '');
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobName = `${folderPath}${fileName}.json`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(Buffer.from(JSON.stringify(logData, null, 2)), {
                blobHTTPHeaders: { blobContentType: 'application/json' },
            });
            filePath = blockBlobClient.url;
            storageType = 'azure';
        }
        catch (error) {
            console.log(error);
        }
        return { filePath, storageType };
    }
    async storeLocally(fileName, logData, folderName) {
        let filePath = '';
        let storageType = '';
        try {
            generic_utility_1.Generic.generateLogFile(fileName, logData, folderName);
            const projectPath = process.cwd();
            const logsPath = path.join(projectPath, '../', 'logs/flight/', folderName, '/');
            filePath = path.join(logsPath, fileName + '.json');
            storageType = 'local';
        }
        catch (error) {
            console.log('Error storing locally:', error);
            this.genericRepo.storeLogs('', 1, error, 0);
        }
        return { filePath, storageType };
    }
    async saveToSupplierLogTable(logId, title, searchReqId, bookingReferenceId, fileName, filePath, storageType) {
        try {
            const supplierLogEntry = new supplier_log_flight_entity_1.SupplierLogFlight();
            supplierLogEntry.log_id = logId;
            supplierLogEntry.title = title;
            supplierLogEntry.search_req_id = searchReqId;
            supplierLogEntry.booking_reference_id = bookingReferenceId;
            supplierLogEntry.path_url = filePath;
            await this.supplierLogRepository.save(supplierLogEntry);
        }
        catch (error) {
            this.genericRepo.storeLogs('', 1, error, 0);
        }
    }
};
exports.SupplierLogUtility = SupplierLogUtility;
exports.SupplierLogUtility = SupplierLogUtility = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        generic_repo_utility_1.GenericRepo,
        typeorm_1.DataSource])
], SupplierLogUtility);
//# sourceMappingURL=supplier-log.utility.js.map