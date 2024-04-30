import { Logger } from '@nestjs/common';

export type SystemDrizzleLoggerOptions = {
    systemLogger: Logger;
};

export type QueryError = Partial<{
    severity: string;
    code: string;
    detail: string;
    schema: string;
    table: string;
}>;
