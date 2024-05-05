import { Logger } from '@nestjs/common';
import { ZodArray, ZodUnknown, infer as ZodInfer, TypeOf } from 'zod';
import { CacheContext } from './cache-context';

export class ListCache<T extends ZodArray<ZodUnknown>> {
    private readonly logger = new Logger(ListCache.name);

    constructor(private readonly context: CacheContext<T>) {}

    private async get<T>(): Promise<TypeOf<T> | null> {
        const cacheData = await this.context.systemRedisService.client.hgetall(this.context.key);
        const cacheValues = Object.values(cacheData);
        if (cacheValues.length === 0) {
            this.logger.debug(`Cache miss, key: [${this.context.key}]`);
            return null;
        }
        const cacheValuesString = `[${cacheValues.join(',')}]`;
        const parsedData = this.context.parseCacheData(cacheValuesString);
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
}
