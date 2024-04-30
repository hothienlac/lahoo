import { Global, Module } from '@nestjs/common';
import { SystemDrizzleService } from './system-drizzle.service';

@Global()
@Module({
    providers: [SystemDrizzleService],
    exports: [SystemDrizzleService],
})
export class SystemDrizzleModule {}
