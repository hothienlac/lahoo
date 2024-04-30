import { Logger } from '@nestjs/common';
import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { msZod } from '@lahoo/util';

const logger = new Logger('System Lock Environment');

export const systemLockEnvironmentSchema = z.object({
    LOCK_KEY_PREFIX: z.string().optional().default('Lock'),
    LOCK_DEFAULT_TTL: msZod('1 second'),
    LOCK_ACQUIRE_RETRY_INTERVAL: msZod('100 milliseconds'),
});

export const systemLockEnvironment = parseEnvironment(systemLockEnvironmentSchema);

export const lockKeyPrefix = systemLockEnvironment.LOCK_KEY_PREFIX;
export const lockDefaultTtl = systemLockEnvironment.LOCK_DEFAULT_TTL;
export const lockAcquireRetryInterval = systemLockEnvironment.LOCK_ACQUIRE_RETRY_INTERVAL;

// Put here not to import from system-logger to avoid circular dependency
const logHeader = '[SystemLockEnvironment]';

logger.warn(`${logHeader} Lock Key Prefix: ${lockKeyPrefix}`);
logger.warn(`${logHeader} Lock Default TTL: ${lockDefaultTtl}`);
logger.warn(`${logHeader} Lock Acquire Retry Interval: ${lockAcquireRetryInterval}`);
