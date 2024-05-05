import { Logger } from '@nestjs/common';
import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { msZod } from '@lahoo/util';

const logger = new Logger('System Cache Environment');

export const systemCacheEnvironmentSchema = z.object({
    CACHE_KEY_PREFIX: z.string().optional().default('Cache'),
    CACHE_RELOAD_LOCK_KEY_PREFIX: z.string().optional().default('CacheReload'),
    CACHE_DEFAULT_TTL: msZod('1 minute'),
    CACHE_RELOAD_TIMEOUT: msZod('1 second'),
    CACHE_TTL_RANDOMNESS: z.coerce.number().optional().default(0.3),
});

export const systemCacheEnvironment = parseEnvironment(systemCacheEnvironmentSchema);

export const cacheKeyPrefix = systemCacheEnvironment.CACHE_KEY_PREFIX;
export const cacheReloadLockKeyPrefix = systemCacheEnvironment.CACHE_RELOAD_LOCK_KEY_PREFIX;
export const cacheDefaultTtl = systemCacheEnvironment.CACHE_DEFAULT_TTL;
export const cacheReloadTimeout = systemCacheEnvironment.CACHE_RELOAD_TIMEOUT;
export const cacheTtlRandomness = systemCacheEnvironment.CACHE_TTL_RANDOMNESS;

// Put here not to import from system-logger to avoid circular dependency
const logHeader = '[SingleItemCache]';

logger.warn(`${logHeader} Cache Key Prefix: ${cacheKeyPrefix}`);
logger.warn(`${logHeader} Cache Reload Lock Key Prefix: ${cacheReloadLockKeyPrefix}`);
logger.warn(`${logHeader} Cache Default TTL: ${cacheDefaultTtl}`);
logger.warn(`${logHeader} Cache Reload Timeout: ${cacheReloadTimeout}`);
logger.warn(`${logHeader} Cache TTL Randomness: ${cacheTtlRandomness}`);
