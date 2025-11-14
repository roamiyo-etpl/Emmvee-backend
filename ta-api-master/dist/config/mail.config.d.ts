import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
export declare const mailConfig: {
    imports: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<{
        transport: {
            host: any;
            port: any;
            ignoreTLS: boolean;
            secure: any;
            auth: {
                user: any;
                pass: any;
            };
        };
        preview: boolean;
        defaults: {
            from: any;
            bcc: any;
            cc: any;
        };
        template: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
    }>;
};
