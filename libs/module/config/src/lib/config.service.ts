import { SystemCacheService } from '@lahoo/system-cache';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigManager } from './config-manager';
import { ZodType } from 'zod';

@Injectable()
export class ConfigService {
    private readonly logger = new Logger(ConfigService.name);

    constructor(
        private readonly systemDrizzleService: SystemDrizzleService,
        private readonly systemCacheService: SystemCacheService,
    ) {}

    createConfig<T extends ZodType>(key: string, schema: T): ConfigManager<T> {
        return new ConfigManager(this.systemDrizzleService, this.systemCacheService, key, schema);
    }
}
