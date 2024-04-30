import { Global, Module } from '@nestjs/common';
import { SystemCacheService } from './system-cache.service';

@Global()
@Module({
    providers: [SystemCacheService],
    exports: [SystemCacheService],
})
export class SystemCacheModule {}
