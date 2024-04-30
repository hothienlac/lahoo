import { Global, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SystemAsyncLocalStorageService } from './system-async-local-storage.service';
import { SystemAsyncLocalStorageMiddleware } from './system-async-local-storage.middleware';

@Global()
@Module({
    providers: [SystemAsyncLocalStorageService],
    exports: [SystemAsyncLocalStorageService],
})
export class SystemAsyncLocalStorageModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SystemAsyncLocalStorageMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
