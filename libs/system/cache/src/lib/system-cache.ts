import { SystemLock, SystemLockService } from '@lahoo/system-lock';
import { SystemRedisService } from '@lahoo/system-redis';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { ZodType, infer as ZodInfer } from 'zod';
import { cacheReloadLockKeyPrefix } from './system-cache.environment';

export class SystemCache<T extends ZodType> {
    private readonly logger = new Logger(SystemCache.name);
    private readonly reloadDataLockKey: string;

    constructor(
        private readonly systemRedisService: SystemRedisService,
        private readonly systemLockService: SystemLockService,
        private readonly key: string,
        private readonly schema: T,
        private readonly ttl: number,
        private readonly reloadDataFunction: () => Promise<ZodInfer<T>>,
        private readonly cacheReloadTimeout: number,
        private readonly cacheTtlRandomness: number,
    ) {
        this.reloadDataLockKey = `${cacheReloadLockKeyPrefix}:${key}`;
    }

    private parseCacheData(cacheData: string): ZodInfer<T> | null {
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

    async getOrReload(): Promise<ZodInfer<T>> {
        const cacheData = await this.get();
        if (cacheData) {
            return cacheData;
        }
        return this.reloadData();
    }

    async get(): Promise<ZodInfer<T> | null> {
        const cacheData = await this.systemRedisService.client.get(this.key);
        if (cacheData === null) {
            this.logger.debug(`Cache miss, key: [${this.key}]`);
            return null;
        }
        const parsedData = this.parseCacheData(cacheData);
        if (!parsedData) {
            this.logger.debug(`Invalid cache data, key: [${this.key}]`);
            return null;
        }
        this.logger.debug(`Cache hit, key: [${this.key}]`);
        return parsedData;
    }

    private async acquireReloadDataLock(): Promise<SystemLock> {
        const reloadDataLock = this.systemLockService.createLock(
            this.reloadDataLockKey,
            this.cacheReloadTimeout,
        );
        const acquired = await reloadDataLock.acquireLockWithTimeout();
        if (!acquired) {
            this.logger.debug(`Failed to acquire lock for reloading cache, key: [${this.key}]`);
            throw new ServiceUnavailableException();
        }
        return reloadDataLock;
    }

    async reloadData(): Promise<ZodInfer<T>> {
        this.logger.debug(`Reloading cache, key: [${this.key}]`);
        const reloadDataLock = await this.acquireReloadDataLock();
        const doubleCheckCacheData = await this.get();
        if (doubleCheckCacheData) {
            this.logger.debug(`Cache reloaded by another concurrency, key: [${this.key}].`);
            await reloadDataLock.releaseLock();
            return doubleCheckCacheData;
        }
        this.logger.debug(`Reloading cache, key: [${this.key}]`);
        let data: ZodInfer<T>;
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
            const dataReloadedByAnother = await this.get();
            if (dataReloadedByAnother) {
                return dataReloadedByAnother;
            }
        }
        this.logger.verbose(`Data reloaded, save to cache, key: [${this.key}]`);
        const randomness = 1 + Math.random() * this.cacheTtlRandomness;
        const ttl = Math.floor(this.ttl * randomness);
        await this.systemRedisService.client.set(this.key, JSON.stringify(data), 'PX', ttl);
        await reloadDataLock.releaseLock();
        this.logger.verbose(`Cache set, key: [${this.key}]`);
        return data;
    }

    async clear(): Promise<void> {
        const reloadDataLock = await this.acquireReloadDataLock();
        this.logger.debug(`Clearing cache, key: [${this.key}]`);
        await this.systemRedisService.client.del(this.key);
        await reloadDataLock.releaseLock();
        this.logger.verbose(`Cache cleared, key: [${this.key}]`);
    }
}
