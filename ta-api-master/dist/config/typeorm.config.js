"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
exports.typeOrmConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        type: 'postgres',
        host: configService.get('main_db.host'),
        port: configService.get('main_db.port'),
        username: configService.get('main_db.username'),
        password: configService.get('main_db.password'),
        database: configService.get('main_db.database'),
        synchronize: configService.get('main_db.synchronize'),
        ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
};
//# sourceMappingURL=typeorm.config.js.map