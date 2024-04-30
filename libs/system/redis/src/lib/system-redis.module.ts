import { Global, Module } from '@nestjs/common';
import { SystemRedisService } from './system-redis.service';

@Global()
@Module({
    providers: [SystemRedisService],
    exports: [SystemRedisService],
})
export class SystemRedisModule {}
