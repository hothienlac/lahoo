import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Redis Environment');

export const redisEnvironmentSchema = z.object({
    REDIS_HOST: z.string().optional(),
    REDIS_PORT: z.coerce.number().optional(),
    REDIS_DATABASE: z.coerce.number().optional(),
    REDIS_KEY_PREFIX: z.string().optional(),
});

export type RedisEnvironment = z.infer<typeof redisEnvironmentSchema>;

export const redisEnvironment = parseEnvironment(redisEnvironmentSchema);

export const redisHost = redisEnvironment.REDIS_HOST;
export const redisPort = redisEnvironment.REDIS_PORT;
export const redisDatabase = redisEnvironment.REDIS_DATABASE;
export const redisKeyPrefix = redisEnvironment.REDIS_KEY_PREFIX;

const logHeader = '[SystemRedisEnvironment]';
logger.warn(`${logHeader} Redis host: ${redisHost}`);
logger.warn(`${logHeader} Redis port: ${redisPort}`);
logger.warn(`${logHeader} Redis database: ${redisDatabase}`);
logger.warn(`${logHeader} Redis key prefix: ${redisKeyPrefix}`);
