import { Test, TestingModule } from '@nestjs/testing';
import { SystemQuerierService } from './system-querier.service';

describe('SystemQuerierService', () => {
    let service: SystemQuerierService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SystemQuerierService],
        }).compile();

        service = module.get<SystemQuerierService>(SystemQuerierService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
