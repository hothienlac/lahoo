import { SystemRedisService } from '@lahoo/system-redis';
import { Injectable, Logger } from '@nestjs/common';
import { SystemLock } from './system-lock';
import { lockDefaultTtl, lockKeyPrefix, lockAcquireRetryInterval } from './system-lock.environment';

@Injectable()
export class SystemLockService {
    private readonly logger = new Logger(SystemLockService.name);

    constructor(private readonly systemRedisService: SystemRedisService) {}

    createLock(key: string, ttl: number = lockDefaultTtl): SystemLock {
        const lock = new SystemLock(
            this.systemRedisService,
            lockKeyPrefix ? `${lockKeyPrefix}:${key}` : key,
            ttl,
            lockAcquireRetryInterval,
        );
        return lock;
    }
}
