import { Global, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SystemLoggerService } from './system-logger.service';
import { SystemLoggerMiddleware } from './system-logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SystemLoggerInterceptor } from './system-logger.interceptor';
import { SystemLoggerFilter } from './system-logger.filter';

@Global()
@Module({
    providers: [
        SystemLoggerService,
        {
            provide: APP_INTERCEPTOR,
            useClass: SystemLoggerInterceptor,
        },
    ],
    exports: [SystemLoggerService],
})
export class SystemLoggerModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(SystemLoggerMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}
