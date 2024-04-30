import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { INTERNAL, loggingLevelPriority } from './system-logger.type';
import { SystemAsyncLocalStorageService } from '@lahoo/system-async-local-storage';
import { loggingLevel } from './system-logger.environment';

@Injectable()
export class SystemLoggerService extends ConsoleLogger {
    constructor(private readonly systemAsyncLocalStorageService: SystemAsyncLocalStorageService) {
        super();
        // Set log levels related to loggingLevel
        const loggingLevels = Object.entries(loggingLevelPriority)
            .filter(([, level]) => level <= loggingLevelPriority[loggingLevel])
            .map(([key]) => key);
        this.setLogLevels(loggingLevels as LogLevel[]);
    }

    protected override formatMessage(
        logLevel: LogLevel,
        message: unknown,
        pidMessage: string,
        formattedLogLevel: string,
        contextMessage: string,
        timestampDiff: string,
    ) {
        const output = this.stringifyMessage(message, logLevel);
        pidMessage = this.colorize(pidMessage, logLevel);
        formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
        const requestId = this.systemAsyncLocalStorageService.get('__CLS_REQUEST_ID__') ?? INTERNAL;
        const formattedRequestId = this.colorize(`[${requestId}]`, logLevel);
        return `${pidMessage}${this.getTimestamp()} ${formattedRequestId} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}\n`;
    }
}
