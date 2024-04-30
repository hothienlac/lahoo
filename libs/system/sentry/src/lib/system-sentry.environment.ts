import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Sentry Environment');

export const sentryEnvironmentSchema = z.object({
    SENTRY_DSN: z.string(),
});

export type SentryEnvironment = z.infer<typeof sentryEnvironmentSchema>;

export const sentryEnvironment = parseEnvironment(sentryEnvironmentSchema);

export const sentryDsn = sentryEnvironment.SENTRY_DSN;

const logHeader = '[SystemSentryEnvironment]';
logger.warn(`${logHeader} Sentry Dsn: ${sentryDsn}`);
