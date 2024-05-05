import { INestApplication, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { SystemLoggerFilter, SystemLoggerService } from '@lahoo/system-logger';
import { GlobalExceptionFilter } from './global.exception-filter';
import { SystemSentryFilter } from '@lahoo/system-sentry';

const logger = new Logger('Setup Application');

// This function mutate the app object, no return value needed
export function setupApplication(app: INestApplication): void {
    const systemLoggerService = app.get(SystemLoggerService);
    app.useLogger(systemLoggerService);
    logger.log('Logger service injected into application');
    const httpAdapter = app.getHttpAdapter();
    const globalExceptionFilter = new GlobalExceptionFilter(httpAdapter, [
        new SystemLoggerFilter(),
        new SystemSentryFilter(),
    ]);
    app.useGlobalFilters(globalExceptionFilter);
    app.enableCors({ origin: true });
    app.use(helmet());
    logger.log('Cors and Helmet enabled');

    const apiPrefix = process.env['API_PREFIX'];
    if (apiPrefix) {
        app.setGlobalPrefix(apiPrefix);
        logger.log(`API prefix set to ${apiPrefix}`);
    }

    logger.log('Done setting up application 🚀');
}
