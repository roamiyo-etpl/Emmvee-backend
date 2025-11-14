export declare class DateUtility {
    static currentDateTimeIST(): string;
    static currentDateOnlyIST(): string;
    static convertDateIntoYMD(date: any): string;
    static getTimeFromDateInHMA(date: any): string;
    static convertMinutesIntoHoursMinutes(minutes: any): string;
    static toISOString(date?: Date | string): string;
}
