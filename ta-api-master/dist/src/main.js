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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("../config/swagger.config");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const configService = app.get(config_1.ConfigService);
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.SwaggerConfig);
    const filePath = path.resolve('swagger/swagger.json');
    const whiteList = configService.getOrThrow('server.origin');
    app.enableCors({
        origin: function (origin, callback) {
            if (!origin || whiteList.findIndex((url) => origin.startsWith(url)) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    fs.writeFileSync(filePath, JSON.stringify(document, null, 2), 'utf-8');
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    const serverPort = configService.get('server.port');
    await app.listen(serverPort);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.verbose(`Server is running on port -> ${serverPort}`);
}
bootstrap();
//# sourceMappingURL=main.js.map