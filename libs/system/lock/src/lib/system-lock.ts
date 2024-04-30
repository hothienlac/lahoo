import { SystemRedisService } from '@lahoo/system-redis';
import { sleep } from '@lahoo/util';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

export class SystemLock {
    private readonly logger = new Logger(SystemLock.name);
    private readonly lockValue = randomUUID();
    private lockAcquireAt = 0;

    constructor(
        private readonly systemRedisService: SystemRedisService,
        public readonly key: string,
        public readonly ttl: number,
        public readonly lockAcquireRetryInterval: number,
    ) {}

    async acquireLock(): Promise<boolean> {
        const result = await this.systemRedisService.client.set(
            this.key,
            this.lockValue,
            'PX',
            this.ttl,
            'NX',
        );
        const acquired = result === 'OK';
        if (acquired) {
            this.logger.debug(`Acquired lock, key: ${this.key}`);
        }
        return acquired;
    }

    async acquireLockWithTimeout(timeout?: number): Promise<boolean> {
        const timeoutMs = timeout ?? this.ttl * 2;
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            const result = await this.acquireLock();
            if (result) {
                this.logger.debug(`Acquired lock with timeout, key: ${this.key}`);
                this.lockAcquireAt = Date.now();
                return true;
            }
            await sleep(this.lockAcquireRetryInterval);
        }
        this.logger.debug(`Failed to acquire lock with timeout, key: ${this.key}`);
        return false;
    }

    async releaseLock(): Promise<void> {
        const releaseScript = `
            if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("del", KEYS[1])
            else
                return 0
            end
        `;
        this.logger.debug(`Releasing lock, key: ${this.key}`);
        await this.systemRedisService.client.eval(releaseScript, 1, this.key, this.lockValue);
    }

    isLockExpired(): boolean {
        return Date.now() - this.lockAcquireAt > this.ttl;
    }
}
