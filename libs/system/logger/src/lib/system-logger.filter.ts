import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class SystemLoggerFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger(SystemLoggerFilter.name);

    catch(exception: T, host: ArgumentsHost): never {
        const httpContext = host.switchToHttp();
        const request = httpContext.getRequest();
        const isKnownException = exception instanceof HttpException || exception instanceof Error;

        const exceptionDetails = isKnownException
            ? exception
            : {
                  name: 'Unknown Exception',
                  message: 'Unknown Exception',
              };

        this.logger.error(
            `${request.method} ${request.url} raised an exception! Error: [${exceptionDetails.name}] ${exceptionDetails.message}]`,
        );

        throw exception;
    }
}
