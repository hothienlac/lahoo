import {
    ArgumentsHost,
    ExceptionFilter,
    HttpServer,
    InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export class GlobalExceptionFilter extends BaseExceptionFilter {
    constructor(httpServer: HttpServer, private readonly exceptionFilters: ExceptionFilter[]) {
        super(httpServer);
    }

    override async catch(exception: Error, host: ArgumentsHost): Promise<void> {
        for (const filter of this.exceptionFilters) {
            try {
                exception = await filter.catch(exception, host);
            } catch (e) {
                if (e instanceof Error) {
                    exception = e;
                } else {
                    exception = new InternalServerErrorException('An unknown error occurred.');
                }
            }
        }
        super.catch(exception, host);
    }
}
