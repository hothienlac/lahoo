import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { sentryDsn } from './system-sentry.environment';

Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 1.0,
});

@Catch()
export class SystemSentryFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger(SystemSentryFilter.name);

    async catch(exception: T, host: ArgumentsHost): Promise<never> {
        if (exception instanceof HttpException && exception.getStatus() < 500) {
            throw exception;
        }
        Sentry.captureException(exception);
        await Sentry.flush(2000);
        throw exception;
    }
}
