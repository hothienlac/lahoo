import { Test, TestingModule } from '@nestjs/testing';
import { SystemCacheService } from './system-cache.service';

describe('SystemCacheService', () => {
    let service: SystemCacheService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SystemCacheService],
        }).compile();

        service = module.get<SystemCacheService>(SystemCacheService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
