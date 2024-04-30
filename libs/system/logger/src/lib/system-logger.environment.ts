import { Logger } from '@nestjs/common';
import { z } from 'zod';
import { parseEnvironment } from '@lahoo/system-environment';
import { LoggingLevel } from './system-logger.type';
import { green, red, yellow, blue, magenta, Chalk } from 'chalk';

const logger = new Logger('Logger Environment');

export const loggerEnvironmentSchema = z.object({
    LOGGING_LEVEL: z.nativeEnum(LoggingLevel).default(LoggingLevel.LOG),
});

export const loggerEnvironment = parseEnvironment(loggerEnvironmentSchema);

export const loggingLevel = loggerEnvironment.LOGGING_LEVEL;

const logHeader = '[SystemLoggerEnvironment]';
logger.warn(`${logHeader} Logging level: ${loggingLevel}`);

export const loggerChalk: Record<LoggingLevel, Chalk> = {
    [LoggingLevel.VERBOSE]: magenta,
    [LoggingLevel.DEBUG]: blue,
    [LoggingLevel.LOG]: green,
    [LoggingLevel.WARN]: yellow,
    [LoggingLevel.ERROR]: red,
};
