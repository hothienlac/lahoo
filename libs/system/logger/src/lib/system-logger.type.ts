export enum LoggingLevel {
    ERROR = 'error',
    WARN = 'warn',
    LOG = 'log',
    DEBUG = 'debug',
    VERBOSE = 'verbose',
}

export const loggingLevelOrder: LoggingLevel[] = Object.values(LoggingLevel);

export const loggingLevelPriority = Object.fromEntries(
    loggingLevelOrder.map((level, index) => [level, index]),
) as {
    [key in LoggingLevel]: number;
};

export const INTERNAL = 'Internal';
