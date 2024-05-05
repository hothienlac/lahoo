import { SystemCache, SystemCacheService } from '@lahoo/system-cache';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { ZodType, infer as ZodInfer } from 'zod';
import { configCacheKeyPrefix, configCacheTtl } from './config.environment';
import { configTable } from './database';
import { eq } from 'drizzle-orm';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

export class ConfigManager<T extends ZodType> {
    private readonly logger = new Logger(ConfigManager.name);
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
        this.logger.verbose(`Getting config [${this.key}] from database`);
        const rawConfigs = await this.systemDrizzleService.drizzle
            .select()
            .from(configTable)
            .where(eq(configTable.key, this.key));
        if (rawConfigs.length === 0) {
            throw new NotFoundException(`Config [${this.key}] not found`);
        }
        this.logger.verbose(`Got config [${this.key}] from database`);
        return rawConfigs[0].value;
    }

    private async getConfigFromDatabase(): Promise<ZodInfer<T>> {
        const rawConfig = await this.getRawConfigFromDatabase();
        const config = this.schema.safeParse(rawConfig);
        if (!config.success) {
            throw new InternalServerErrorException(
                `Config [${this.key}] is invalid, consider manual intervention.`,
            );
        }
        this.logger.verbose(`Parsed config [${this.key}] from database`);
        return config.data;
    }

    async get(): Promise<ZodInfer<T>> {
        this.logger.debug(`Getting config [${this.key}]`);
        return this.configCache.getOrReload();
    }

    async create(value: ZodInfer<T>): Promise<void> {
        this.logger.debug(`Creating config [${this.key}]`);
        await this.systemDrizzleService.drizzle
            .insert(configTable)
            .values([{ key: this.key, value }])
            .execute();
    }

    async update(value: ZodInfer<T>): Promise<void> {
        this.logger.debug(`Updating config [${this.key}]`);
        // Check if the config is existing
        await this.getRawConfigFromDatabase();
        await this.systemDrizzleService.drizzle
            .update(configTable)
            .set({ value })
            .where(eq(configTable.key, this.key));
        await this.configCache.clear();
    }
}
