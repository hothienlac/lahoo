import { SystemLoggerInterceptor } from './system-logger.interceptor';

describe('SystemLoggerInterceptor', () => {
    it('should be defined', () => {
        expect(new SystemLoggerInterceptor()).toBeDefined();
    });
});
