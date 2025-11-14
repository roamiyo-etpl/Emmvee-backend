"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
exports.mailConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        transport: {
            host: configService.get('email.host'),
            port: configService.get('email.port'),
            ignoreTLS: true,
            secure: configService.get('email.secure'),
            auth: {
                user: configService.get('email.user'),
                pass: configService.get('email.pass'),
            },
        },
        preview: configService.get('server.env') == 'development',
        defaults: {
            from: configService.get('email.from'),
            bcc: configService.get('server.env') == 'production' ? configService.get('email.bcc') : '',
            cc: configService.get('server.env') == 'production' ? configService.get('email.cc') : '',
        },
        template: {
            dir: 'src/shared/email-templates',
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    }),
};
//# sourceMappingURL=mail.config.js.map