import { forwardRef, Module } from '@nestjs/common';
import { Constructor } from 'type-fest';
import { SystemLoggerModule } from '@lahoo/system-logger';
import { SystemAuthenticationModule } from '@lahoo/system-authentication';
import { ModuleAuthenticationModule } from '@lahoo/authentication';
import { SystemDrizzleModule } from '@lahoo/system-drizzle';
import { SystemRedisModule } from '@lahoo/system-redis';
import { SystemLockModule } from '@lahoo/system-lock';
import { SystemCacheModule } from '@lahoo/system-cache';
import { SystemCentrifugoModule } from '@lahoo/system-centrifugo';
import { SystemSentryModule } from '@lahoo/system-sentry';

export function addRequiredModules(AppModule: Constructor<unknown>): Constructor<unknown> {
    @Module({
        imports: [
            forwardRef(() => AppModule),
            SystemDrizzleModule,
            SystemRedisModule,
            SystemLockModule,
            SystemCacheModule,
            SystemAuthenticationModule,
            ModuleAuthenticationModule,
            SystemLoggerModule,
            SystemCentrifugoModule,
            SystemSentryModule,
        ],
    })
    class EnhancedAppModule {}

    return EnhancedAppModule;
}
