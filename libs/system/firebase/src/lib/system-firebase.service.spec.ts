import { Test, TestingModule } from '@nestjs/testing';
import { SystemFirebaseService } from './system-firebase.service';

describe('SystemFirebaseService', () => {
    let service: SystemFirebaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SystemFirebaseService],
        }).compile();

        service = module.get<SystemFirebaseService>(SystemFirebaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
