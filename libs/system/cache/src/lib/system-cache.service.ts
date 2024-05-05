import { Injectable, Logger } from '@nestjs/common';
import { SystemRedisService } from '@lahoo/system-redis';
import { SystemLockService } from '@lahoo/system-lock';
import { SingleItemCache } from './single-item-cache';
import { ListCache } from './list-cache';
import { ZodType, TypeOf, ZodArray, ZodUnknown } from 'zod';
import { cacheKeyPrefix } from './system-cache.environment';
import { CacheContext } from './cache-context';

@Injectable()
export class SystemCacheService {
    private readonly logger = new Logger(SystemCacheService.name);

    constructor(
        private readonly systemRedisService: SystemRedisService,
        private readonly systemLockService: SystemLockService,
    ) {}

    private createSingleItemCacheKey(key: string): string {
        return `${cacheKeyPrefix}:SingleItem:${key}`;
    }

    private createListCacheKey(key: string): string {
        return `${cacheKeyPrefix}:List:${key}`;
    }

    createSingleItemCache<T extends ZodType>(
        key: string,
        schema: T,
        reloadDataFunction: () => Promise<TypeOf<T>>,
        ttl?: number,
    ): SingleItemCache<T> {
        const context = new CacheContext(
            this.systemRedisService,
            this.systemLockService,
            reloadDataFunction,
            schema,
            this.createSingleItemCacheKey(key),
            ttl,
        );
        const cache = new SingleItemCache(context);
        return cache;
    }

    createListCache<T extends ZodArray<ZodUnknown>>(
        key: string,
        schema: T,
        reloadDataFunction: () => Promise<TypeOf<T>>,
        ttl?: number,
    ): ListCache<T> {
        const context = new CacheContext(
            this.systemRedisService,
            this.systemLockService,
            reloadDataFunction,
            schema,
            this.createListCacheKey(key),
            ttl,
        );
        const cache = new ListCache(context);
        return cache;
    }
}
