import { Repository } from 'typeorm';
import { ErrorLogs } from 'src/shared/entities/error-logs.entity';
export declare class GenericRepo {
    private errorLogsRepo;
    constructor(errorLogsRepo: Repository<ErrorLogs>);
    storeLogs(searchReqId: string, logsType: number, data: any, isEmail: number): Promise<ErrorLogs>;
    getLogsByTime(): Promise<ErrorLogs[]>;
    deleteLogsByID(logIds: any): Promise<import("typeorm").DeleteResult>;
}
