import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationModule } from '@lahoo/authentication';
import { StoreModule } from '@lahoo/store';
import { CategoryController } from './controllers/category.controller';
import { LabelController } from './controllers/label.controller';
import { BranchController } from './controllers/branch.controller';

@Module({
    imports: [AuthenticationModule, StoreModule],
    controllers: [AuthenticationController, CategoryController, LabelController, BranchController],
})
export class AppModule {}
