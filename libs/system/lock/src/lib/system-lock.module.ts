import { Global, Module } from '@nestjs/common';
import { SystemLockService } from './system-lock.service';
import { SystemRedisModule } from '@lahoo/system-redis';

@Global()
@Module({
    imports: [SystemRedisModule],
    providers: [SystemLockService],
    exports: [SystemLockService],
})
export class SystemLockModule {}
