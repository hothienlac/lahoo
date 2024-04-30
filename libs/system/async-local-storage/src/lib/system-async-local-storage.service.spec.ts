import { Test, TestingModule } from '@nestjs/testing';
import { SystemAsyncLocalStorageService } from './system-async-local-storage.service';

describe('SystemAsyncLocalStorageService', () => {
    let service: SystemAsyncLocalStorageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SystemAsyncLocalStorageService],
        }).compile();

        service = module.get<SystemAsyncLocalStorageService>(SystemAsyncLocalStorageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
