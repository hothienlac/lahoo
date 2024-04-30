import { Test, TestingModule } from '@nestjs/testing';
import { SystemDrizzleService } from './system-drizzle.service';

describe('SystemDrizzleService', () => {
    let service: SystemDrizzleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SystemDrizzleService],
        }).compile();

        service = module.get<SystemDrizzleService>(SystemDrizzleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
