import { Logger } from '@nestjs/common';
import { ZodType, TypeOf } from 'zod';
import { CacheContext } from './cache-context';

export class SingleItemCache<T extends ZodType> {
    private readonly logger = new Logger(SingleItemCache.name);

    constructor(private readonly context: CacheContext<T>) {}

    private async get(): Promise<TypeOf<T> | null> {
        const cacheData = await this.context.systemRedisService.client.get(this.context.key);
        if (cacheData === null) {
            this.logger.debug(`Cache miss, key: [${this.context.key}]`);
            return null;
        }
        const parsedData = this.context.parseCacheData(cacheData);
        if (!parsedData) {
            this.logger.debug(`Invalid cache data, key: [${this.context.key}]`);
            return null;
        }
        this.logger.debug(`Cache hit, key: [${this.context.key}]`);
        return parsedData;
    }

    private async reloadData(): Promise<TypeOf<T>> {
        const data = await this.context.reloadData(this.get.bind(this), async (data) => {
            await this.context.systemRedisService.client.set(
                this.context.key,
                JSON.stringify(data),
                'PX',
                this.context.ttl,
            );
        });
        return data;
    }

    async getOrReload(): Promise<TypeOf<T>> {
        const cacheData = await this.get();
        if (cacheData) {
            return cacheData;
        }
        return this.reloadData();
    }

    async clear(): Promise<void> {
        this.context.clear(async () => {
            await this.context.systemRedisService.client.del(this.context.key);
        });
    }
}
