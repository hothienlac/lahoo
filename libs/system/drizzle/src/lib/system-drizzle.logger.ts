import { Logger } from '@nestjs/common';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { SystemDrizzleLoggerOptions } from './system-drizzle.type';
import { DISABLE_LOGGING_TOKEN } from './system-drizzle.constant';

export class SystemDrizzleWriter implements LogWriter {
    systemLogger: Logger;

    constructor(private readonly options: SystemDrizzleLoggerOptions) {
        this.systemLogger = options.systemLogger;
    }

    write(message: string): void {
        if (message.includes(DISABLE_LOGGING_TOKEN)) {
            return;
        }
        this.systemLogger.verbose(`[DRIZZLE] | ${message}`);
    }
}

export function systemDrizzleLoggerBuilder(options: SystemDrizzleLoggerOptions): DefaultLogger {
    return new DefaultLogger({
        writer: new SystemDrizzleWriter(options),
    });
}
