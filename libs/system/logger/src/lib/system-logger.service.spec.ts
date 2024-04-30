import { Test, TestingModule } from '@nestjs/testing';
import { SystemLoggerService } from './system-logger.service';

describe('SystemLoggerService', () => {
    let service: SystemLoggerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SystemLoggerService],
        }).compile();

        service = module.get<SystemLoggerService>(SystemLoggerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
