// Each namespace is dedicated to one environment. So, in deployment, only namespace environment is set.
// The environment is determined by the namespace.

import { ZodObject, ZodRawShape } from 'zod';
import { Logger } from '@nestjs/common';
import { ParseEnvironmentError } from './system-environment.type';

const logger = new Logger('SystemEnvironmentUtil');

export function parseEnvironment<T extends ZodRawShape>(schema: ZodObject<T>) {
    const environments = schema.safeParse(process.env);
    if (!environments.success) {
        logger.error(environments.error);
        throw new ParseEnvironmentError(
            `Invalid environment variables. Check logs for more details.`,
        );
    }
    return environments.data;
}
