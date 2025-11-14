import { RevalidateService } from './revalidate.service';
import { RevalidateDto } from './dtos/revalidate.dto';
import { RevalidateResponse } from './interfaces/revalidate.interface';
export declare class RevalidateController {
    private readonly revalidateService;
    constructor(revalidateService: RevalidateService);
    revalidate(revalidateDto: RevalidateDto, headers: Headers): Promise<RevalidateResponse>;
}
