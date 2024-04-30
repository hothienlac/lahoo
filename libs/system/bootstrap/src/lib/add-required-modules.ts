import { forwardRef, Module } from '@nestjs/common';
import { Constructor } from 'type-fest';
import { SystemLoggerModule } from '@lahoo/system-logger';
import { SystemAuthenticationModule } from '@lahoo/system-authentication';
import { AuthenticationModule } from '@lahoo/authentication';
import { SystemDrizzleModule } from '@lahoo/system-drizzle';
import { SystemRedisModule } from '@lahoo/system-redis';
import { SystemLockModule } from '@lahoo/system-lock';
import { SystemCacheModule } from '@lahoo/system-cache';
import { SystemCentrifugoModule } from '@lahoo/system-centrifugo';
import { SystemSentryModule } from '@lahoo/system-sentry';
import { SystemAsyncLocalStorageModule } from '@lahoo/system-async-local-storage';

export function addRequiredModules(AppModule: Constructor<unknown>): Constructor<unknown> {
    @Module({
        imports: [
            forwardRef(() => AppModule),
            SystemAsyncLocalStorageModule,
            SystemDrizzleModule,
            SystemRedisModule,
            SystemLockModule,
            SystemCacheModule,
            SystemAuthenticationModule,
            AuthenticationModule,
            SystemLoggerModule,
            SystemCentrifugoModule,
            SystemSentryModule,
        ],
    })
    class EnhancedAppModule {}

    return EnhancedAppModule;
}
