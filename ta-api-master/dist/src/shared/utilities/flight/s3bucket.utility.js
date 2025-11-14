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
exports.s3BucketService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const fs = __importStar(require("fs"));
const generic_repo_utility_1 = require("./generic-repo.utility");
const generic_utility_1 = require("./generic.utility");
let s3BucketService = class s3BucketService {
    configService;
    genericRepo;
    constructor(configService, genericRepo) {
        this.configService = configService;
        this.genericRepo = genericRepo;
    }
    async transferFlightLogsToS3(logPath, bucketPath) {
        try {
            const AWSCredentials = {
                accessKey: this.configService.get('s3.accessKey'),
                secret: this.configService.get('s3.secretKey'),
                bucketName: 'mwr_travels_db',
                region: this.configService.get('s3.awsRegion'),
            };
            const s3Client = new client_s3_1.S3Client({
                credentials: {
                    accessKeyId: AWSCredentials.accessKey,
                    secretAccessKey: AWSCredentials.secret,
                },
            });
            const today = new Date();
            const priorDate = new Date(new Date().setDate(today.getDate() - 15));
            const files = fs.readdirSync(logPath);
            for (const file of files) {
                const stats = fs.statSync(logPath + file);
                if (stats.birthtime <= priorDate) {
                    const fileContent = fs.readFileSync(logPath + file);
                    const params = {
                        Bucket: AWSCredentials.bucketName,
                        Key: bucketPath + file,
                        Body: fileContent,
                        ACL: client_s3_1.ObjectCannedACL.public_read,
                        ContentType: 'text/html',
                    };
                    try {
                        const command = new client_s3_1.PutObjectCommand(params);
                        await s3Client.send(command);
                        fs.unlinkSync(logPath + file);
                    }
                    catch (err) {
                        this.genericRepo.storeLogs('', 1, err, 0);
                    }
                }
            }
        }
        catch (error) {
            this.genericRepo.storeLogs('', 1, error, 0);
            throw new common_1.InternalServerErrorException('There is an issue while moving logs in s3 bucket.');
        }
    }
    async generateS3LogFile(fileName, logData, folderName) {
        if (process.env.NODE_ENV == 'production') {
            const bucketPath = 'logs/flight_logs/' + folderName + '/';
            try {
                const AWSCredentials = {
                    accessKey: this.configService.get('s3.accessKey'),
                    secret: this.configService.get('s3.secretKey'),
                    bucketName: 'mwr_travels_db',
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
        }
        else {
            generic_utility_1.Generic.generateLogFile(fileName, logData, folderName);
        }
    }
    async generateS3LogFileHotel(fileName, logData, folderName) {
        if (process.env.NODE_ENV == 'production') {
            const bucketPath = 'logs/hotel_logs/' + folderName + '/';
            try {
                const AWSCredentials = {
                    accessKey: this.configService.get('s3.accessKey'),
                    secret: this.configService.get('s3.secretKey'),
                    bucketName: 'mwr_travels_db',
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
        }
        else {
        }
    }
};
exports.s3BucketService = s3BucketService;
exports.s3BucketService = s3BucketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        generic_repo_utility_1.GenericRepo])
], s3BucketService);
//# sourceMappingURL=s3bucket.utility.js.map