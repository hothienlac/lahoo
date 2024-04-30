import { SystemAsyncLocalStorageMiddleware } from './system-async-local-storage.middleware';

describe('SystemAsyncLocalStorageMiddleware', () => {
    it('should be defined', () => {
        expect(new SystemAsyncLocalStorageMiddleware()).toBeDefined();
    });
});
