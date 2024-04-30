import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { generateRandomNumberString } from '@lahoo/util-random';
import { CLS_REQUEST_ID, REQUEST_ID } from '@lahoo/constant';
import { SystemAsyncLocalStorageService } from '@lahoo/system-async-local-storage';

@Injectable()
export class SystemLoggerMiddleware implements NestMiddleware {
    constructor(private readonly systemAsyncLocalStorageService: SystemAsyncLocalStorageService) {}

    use(request: Request, response: Response, next: NextFunction): void {
        const requestId = generateRandomNumberString(12);
        response.set(REQUEST_ID, requestId);
        this.systemAsyncLocalStorageService.set(CLS_REQUEST_ID, requestId);
        next();
    }
}
