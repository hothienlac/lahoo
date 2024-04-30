import { SystemCache, SystemCacheService } from '@lahoo/system-cache';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { ZodType, infer as ZodInfer } from 'zod';
import { configCacheKeyPrefix, configCacheTtl } from './config.environment';
import { configTable } from './database/config.table';
import { eq } from 'drizzle-orm';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

export class Config<T extends ZodType> {
    private readonly logger = new Logger(Config.name);
    private readonly configCacheKey: string;
    private readonly configCache: SystemCache<T>;

    constructor(
        private readonly systemDrizzleService: SystemDrizzleService,
        private readonly systemCacheService: SystemCacheService,
        private readonly key: string,
        private readonly schema: T,
    ) {
        this.configCacheKey = `${configCacheKeyPrefix}:${key}`;
        this.configCache = this.systemCacheService.createCache(
            this.configCacheKey,
            schema,
            this.getConfigFromDatabase.bind(this),
            configCacheTtl,
        );
    }

    private async getRawConfigFromDatabase(): Promise<unknown> {
        const rawConfigs = await this.systemDrizzleService.drizzle
            .select()
            .from(configTable)
            .where(eq(configTable.key, this.key));
        if (rawConfigs.length === 0) {
            throw new NotFoundException(`Config ${this.key} not found`);
        }
        return rawConfigs[0].value;
    }

    private async getConfigFromDatabase(): Promise<ZodInfer<T>> {
        const rawConfig = await this.getRawConfigFromDatabase();
        const config = this.schema.safeParse(rawConfig);
        if (!config.success) {
            throw new InternalServerErrorException(
                `Config ${this.key} is invalid, consider manual intervention.`,
            );
        }
        return config.data;
    }

    async get(): Promise<ZodInfer<T>> {
        return this.configCache.getOrReload();
    }

    async create(value: ZodInfer<T>): Promise<void> {
        await this.systemDrizzleService.drizzle
            .insert(configTable)
            .values([{ key: this.key, value }])
            .execute();
    }

    async update(value: ZodInfer<T>): Promise<void> {
        // Check if the config is existing
        await this.getRawConfigFromDatabase();
        await this.systemDrizzleService.drizzle
            .update(configTable)
            .set({ value })
            .where(eq(configTable.key, this.key));
        await this.configCache.clear();
    }
}
