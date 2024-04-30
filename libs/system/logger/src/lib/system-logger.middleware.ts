import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { generateRandomNumberString } from '@lahoo/util';
import { SystemAsyncLocalStorageService } from '@lahoo/system-async-local-storage';

@Injectable()
export class SystemLoggerMiddleware implements NestMiddleware {
    constructor(private readonly systemAsyncLocalStorageService: SystemAsyncLocalStorageService) {}

    use(request: Request, response: Response, next: NextFunction): void {
        const requestId = generateRandomNumberString(12);
        response.set('Request-Id', requestId);
        this.systemAsyncLocalStorageService.set('__CLS_REQUEST_ID__', requestId);
        next();
    }
}
