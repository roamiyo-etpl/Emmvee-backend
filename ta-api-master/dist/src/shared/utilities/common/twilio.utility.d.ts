export interface TwilioVerificationResult {
    status: boolean;
    data: any;
}
export declare class TwilioUtility {
    static verifyPhoneNumber(phoneNumber: string, accountSid: string, authToken: string): Promise<TwilioVerificationResult>;
    static phoneNumberVerifyApiCheck(phoneNumber: string, isActive: boolean, accountSid: string, authToken: string): Promise<TwilioVerificationResult>;
}
