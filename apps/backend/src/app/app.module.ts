import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationModule } from '@lahoo/authentication';
import { StoreModule } from '@lahoo/store';

@Module({
    imports: [AuthenticationModule, StoreModule],
    controllers: [AuthenticationController],
})
export class AppModule {}
