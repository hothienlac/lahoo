import { Global, Module } from '@nestjs/common';
import { SystemAuthenticationService } from './system-authentication.service';

@Global()
@Module({
    providers: [SystemAuthenticationService],
    exports: [SystemAuthenticationService],
})
export class SystemAuthenticationModule {}
