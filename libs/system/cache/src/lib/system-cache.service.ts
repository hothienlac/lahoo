import { Injectable, Logger } from '@nestjs/common';
import { SystemRedisService } from '@lahoo/system-redis';
import { SystemLockService } from '@lahoo/system-lock';
import { SystemCache } from './system-cache';
import { ZodType, infer as ZodInfer } from 'zod';
import {
    cacheDefaultTtl,
    cacheKeyPrefix,
    cacheReloadTimeout,
    cacheTtlRandomness,
} from './system-cache.environment';

@Injectable()
export class SystemCacheService {
    private readonly logger = new Logger(SystemCacheService.name);

    constructor(
        private readonly systemRedisService: SystemRedisService,
        private readonly systemLockService: SystemLockService,
    ) {}

    private createCacheKey(key: string): string {
        return `${cacheKeyPrefix}:${key}`;
    }

    createCache<T extends ZodType>(
        key: string,
        schema: T,
        reloadDataFunction: () => Promise<ZodInfer<T>>,
        ttl?: number,
    ): SystemCache<T> {
        const cache = new SystemCache(
            this.systemRedisService,
            this.systemLockService,
            this.createCacheKey(key),
            schema,
            ttl ?? cacheDefaultTtl,
            reloadDataFunction,
            cacheReloadTimeout,
            cacheTtlRandomness,
        );
        return cache;
    }
}
