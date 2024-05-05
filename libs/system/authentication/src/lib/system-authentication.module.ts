import { Global, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SystemAuthenticationService } from './system-authentication.service';
import { SystemAuthenticationMiddleware } from './system-authentication.middleware';
import { AuthenticationModule } from '@lahoo/authentication';

@Global()
@Module({
    imports: [AuthenticationModule],
    providers: [SystemAuthenticationService],
    exports: [SystemAuthenticationService],
})
export class SystemAuthenticationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SystemAuthenticationMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
