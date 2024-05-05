import { Logger } from '@nestjs/common';
import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { msZod } from '@lahoo/util';

const logger = new Logger('Config Environment');

export const configEnvironmentSchema = z.object({
    CONFIG_CACHE_TTL: msZod('1 hour'),
    CONFIG_CACHE_KEY_PREFIX: z.string().optional().default('Config'),
});

export const configEnvironment = parseEnvironment(configEnvironmentSchema);

export const configCacheTtl = configEnvironment.CONFIG_CACHE_TTL;
export const configCacheKeyPrefix = configEnvironment.CONFIG_CACHE_KEY_PREFIX;

const logHeader = '[ConfigEnvironment]';

logger.warn(`${logHeader} Config Cache Ttl: ${configCacheTtl}`);
logger.warn(`${logHeader} Config Cache Key Prefix: ${configCacheKeyPrefix}`);
