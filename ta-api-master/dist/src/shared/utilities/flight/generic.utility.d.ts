import { StartRoutingDto } from 'src/modules/flight/search/dtos/start-routing.dto';
import { Pagination } from 'src/modules/hotel/search/interfaces/initiate-result-response.interface';
interface AirlineData {
    airline_name: string;
    airline_code: string;
    selling_price: number;
    count?: number;
}
export declare class Generic {
    static getMinPriceFlight(routes: any, priceType: any): any;
    static getMaxPriceFLight(routes: any, priceType: any): any;
    static getStopCounts(routes: any, type: any): {
        non_stop: {
            count: number;
            min_price: null;
        };
        one_stop: {
            count: number;
            min_price: null;
        };
        two_and_two_plus_stop: {
            count: number;
            min_price: null;
        };
    };
    static getAirlineCounts(routes: any[]): AirlineData[];
    static getArrivalDepartureTimeSlot(routes: any, type: any, routeType: any): {
        first_slot: {
            min_price: number;
            count: number;
            from_time: string;
            to_time: string;
        };
        second_slot: {
            min_price: number;
            count: number;
            from_time: string;
            to_time: string;
        };
        third_slot: {
            min_price: number;
            count: number;
            from_time: string;
            to_time: string;
        };
        fourth_slot: {
            min_price: number;
            count: number;
            from_time: string;
            to_time: string;
        };
    };
    static convertToBase64(requestBody: any): string;
    static unzipToJson(response: any): Promise<any>;
    static getAdultCount(searchReq: StartRoutingDto): number;
    static getChildCount(searchReq: StartRoutingDto): number;
    static getInfantCount(searchReq: StartRoutingDto): number;
    static createQunarSign(data: any): string;
    static getTripTypeQunar(trip: any): any;
    static convertCabinClassCode(providerCode: any, cabinCode: any, convertToProvider?: boolean): string;
    static generateLogFile(fileName: any, logData: any, folderName: any): void;
    static convertMinutesToHours(minutes: any): string;
    static isMystiflyForSearch(searchReq: StartRoutingDto): boolean;
    static isValidValue(value: string): boolean;
    static convertHoursToMinutes(timeString: any): any;
    static getTripTypeTbo(trip: any): any;
    static currencyConversion(netRate: any, providerCurrency: any, preferredCurrency: string): number;
    static encrypt(text: string): string;
    static decrypt(encryptedText: string): string;
    static convertTimeString(minutes: number): string;
    static generateRandomString(length?: number): string;
    static calculateAge(dateOfBirth: string): number;
    static calculatePagination(totalResults: number, page: number, limit: number): Pagination;
    static calculatePriceRange<T>(items: T[], priceProperty?: string): [number, number];
    static getCurrencySymbol(currency: string): string;
    static bucketToRange(bucketLabel: string): [number, number];
    static generatePriceBuckets<T>(items: T[], currencySymbol?: string, priceProperty?: string): Record<string, number>;
    static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
    static toRadians(degrees: number): number;
}
export {};
