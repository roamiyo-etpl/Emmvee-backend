import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailModel } from 'src/shared/model/email.model';
export declare class MailUtility {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendEmail(SendEmailModel: SendEmailModel): Promise<void>;
}
