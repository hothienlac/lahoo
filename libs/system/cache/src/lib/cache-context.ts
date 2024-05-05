import { SystemLock, SystemLockService } from '@lahoo/system-lock';
import { SystemRedisService } from '@lahoo/system-redis';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { ZodType, TypeOf } from 'zod';
import {
    cacheDefaultTtl,
    cacheReloadLockKeyPrefix,
    cacheReloadTimeout,
    cacheTtlRandomness,
} from './system-cache.environment';

export class CacheContext<T extends ZodType> {
    readonly logger = new Logger(CacheContext.name);
    readonly reloadDataLockKey: string;
    readonly ttl: number;

    constructor(
        readonly systemRedisService: SystemRedisService,
        readonly systemLockService: SystemLockService,
        readonly reloadDataFunction: () => Promise<TypeOf<T>>,
        readonly schema: T,
        readonly key: string,
        ttl?: number,
    ) {
        this.ttl = ttl ?? cacheDefaultTtl;
        this.reloadDataLockKey = `${cacheReloadLockKeyPrefix}:${key}`;
    }

    parseCacheData(cacheData: string): TypeOf<T> | null {
        let parsedJson: unknown;
        try {
            parsedJson = JSON.parse(cacheData);
        } catch (error) {
            this.logger.error(
                `Failed to parse cache data to JSON, key: [${this.key}], error: ${error}`,
            );
            return null;
        }
        try {
            return this.schema.parse(parsedJson);
        } catch (error) {
            this.logger.error(
                `Failed to validate cache data as not match schema, key: [${this.key}], error: ${error}`,
            );
            return null;
        }
    }

    async acquireReloadDataLock(): Promise<SystemLock> {
        const reloadDataLock = this.systemLockService.createLock(
            this.reloadDataLockKey,
            cacheReloadTimeout,
        );
        const acquired = await reloadDataLock.acquireLockWithTimeout();
        if (!acquired) {
            this.logger.debug(`Failed to acquire lock for reloading cache, key: [${this.key}]`);
            throw new ServiceUnavailableException();
        }
        return reloadDataLock;
    }

    getTtlWithRandomness(): number {
        const randomness = 1 + Math.random() * cacheTtlRandomness;
        const ttl = Math.floor(this.ttl * randomness);
        return ttl;
    }

    async reloadData(
        getCacheData: () => Promise<TypeOf<T> | null>,
        saveCacheData: (data: TypeOf<T>) => Promise<void>,
    ): Promise<TypeOf<T>> {
        this.logger.debug(`Reloading cache, key: [${this.key}]`);
        const reloadDataLock = await this.acquireReloadDataLock();
        const doubleCheckCacheData = await getCacheData();
        if (doubleCheckCacheData) {
            this.logger.debug(`Cache reloaded by another concurrency, key: [${this.key}].`);
            await reloadDataLock.releaseLock();
            return doubleCheckCacheData;
        }
        this.logger.debug(`Reloading cache, key: [${this.key}]`);
        let data: TypeOf<T>;
        try {
            data = await this.reloadDataFunction();
            this.logger.debug(`Reloaded cache, key: [${this.key}]`);
        } catch (error) {
            this.logger.error(`Failed to reload cache, key: [${this.key}], error: ${error}`);
            await reloadDataLock.releaseLock();
            throw error;
        }
        if (reloadDataLock.isLockExpired()) {
            this.logger.warn(`Reloading cache took too long, lock expired, key: [${this.key}]`);
            const dataReloadedByAnother = await getCacheData();
            if (dataReloadedByAnother) {
                return dataReloadedByAnother;
            }
        }
        this.logger.verbose(`Data reloaded, save to cache, key: [${this.key}]`);
        await saveCacheData(data);
        await reloadDataLock.releaseLock();
        this.logger.verbose(`Cache set, key: [${this.key}]`);
        return data;
    }

    async clear(clear: () => Promise<void>): Promise<void> {
        const reloadDataLock = await this.acquireReloadDataLock();
        this.logger.debug(`Clearing cache, key: [${this.key}]`);
        await clear();
        await reloadDataLock.releaseLock();
        this.logger.verbose(`Cache cleared, key: [${this.key}]`);
    }
}
