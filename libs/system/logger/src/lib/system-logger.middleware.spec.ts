import { SystemLoggerMiddleware } from './system-logger.middleware';

describe('SystemLoggerMiddleware', () => {
    it('should be defined', () => {
        expect(new SystemLoggerMiddleware()).toBeDefined();
    });
});
