import { DynamicModule, Logger, Module } from '@nestjs/common';
import { SystemQuerierService } from './system-querier.service';
import { randomUUID } from 'crypto';
import { createAxiosFactory } from './create-axios-factory';
import { AXIOS_INSTANCE_INJECT_TOKEN, HTTP_MODULE_ID } from './system-querier.constant';
import { SystemQuerierOptions } from './system-querier.type';

@Module({
    providers: [SystemQuerierService],
    exports: [SystemQuerierService],
})
export class SystemQuerierModule {
    private readonly logger = new Logger(SystemQuerierModule.name);
    private static isRegistered = false;

    static register(config: SystemQuerierOptions): DynamicModule {
        return {
            module: SystemQuerierModule,
            providers: [
                {
                    provide: AXIOS_INSTANCE_INJECT_TOKEN,
                    useFactory: createAxiosFactory(config),
                },
                {
                    provide: HTTP_MODULE_ID,
                    useValue: randomUUID(),
                },
            ],
        };
    }

    constructor() {
        if (!SystemQuerierModule.isRegistered) {
            throw new Error('SystemQuerierModule must be registered using the register method');
        }
    }
}
