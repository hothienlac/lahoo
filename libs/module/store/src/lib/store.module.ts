import { Module } from '@nestjs/common';
import { StoreService } from './store/store.service';
import { LabelService } from './label/label.service';
import { CategoryService } from './category/category.service';

@Module({
    providers: [StoreService, LabelService, CategoryService],
    exports: [StoreService, LabelService, CategoryService],
})
export class StoreModule {}
