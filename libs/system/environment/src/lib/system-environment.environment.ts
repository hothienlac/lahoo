import { Logger } from '@nestjs/common';
import { parseEnvironment } from './system-environment.util';
import { z } from 'zod';

const logger = new Logger('System Environment');

export const defaultPort = 3000;

export const systemEnvironmentSchema = z.object({
    PORT: z.coerce.number().optional().default(defaultPort),
    APPLICATION_NAME: z.string().transform((value) => {
        // Assume application name is kebab case, convert to PascalCase
        const words = value.split('-');
        const lowerCaseWords = words.map((word) => word.toLowerCase());
        const pascalCaseWords = lowerCaseWords.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1),
        );
        return pascalCaseWords.join('');
    }),
});

export const systemEnvironment = parseEnvironment(systemEnvironmentSchema);

export const port = systemEnvironment.PORT;
export const applicationName = systemEnvironment.APPLICATION_NAME;

// Put here not to import from system-logger to avoid circular dependency
const logHeader = '[SystemEnvironment]';

logger.warn(`${logHeader} Port: ${port}`);
logger.warn(`${logHeader} Application Name: ${applicationName}`);
