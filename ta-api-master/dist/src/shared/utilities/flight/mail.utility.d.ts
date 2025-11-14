import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailModel } from 'src/shared/model/email.model';
export declare class MailService {
    private mailService;
    constructor(mailService: MailerService);
    sendMail(emailData: SendEmailModel): Promise<void>;
}
