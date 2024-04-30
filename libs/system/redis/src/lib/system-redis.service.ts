import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { redisDatabase, redisHost, redisKeyPrefix, redisPort } from './system-redis.environment';

@Injectable()
export class SystemRedisService {
    private readonly logger = new Logger(SystemRedisService.name);

    client = new Redis({
        host: redisHost,
        port: redisPort,
        db: redisDatabase,
        keyPrefix: redisKeyPrefix,
    });
}
