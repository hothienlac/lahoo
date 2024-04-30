import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class SystemLoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(SystemLoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<Request>();
        const beginTime = Date.now();
        const logHeader = `[${request.method}: ${request.url}]`;
        this.logger.debug(`${logHeader} New Request Received!`);
        return next.handle().pipe(
            tap(() => {
                const endTime = Date.now();
                const requestDuration = endTime - beginTime;
                this.logger.log(
                    `${logHeader} responded successfully! Request duration: ${requestDuration}ms.`,
                );
                // Now attach the request duration to the response header.
                // This is useful for debugging purpose.
                request.res?.set('Request-Duration', requestDuration.toString());
            }),
        );
    }
}
