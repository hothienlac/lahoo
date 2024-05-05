import {
    Categories,
    CategoryService,
    CreateCategoryRequest,
    createCategoryRequestSchema,
} from '@lahoo/store';
import { ParseBodyPipe } from '@lahoo/system-pipe';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getCategories(): Promise<Categories> {
        return this.categoryService.getCategories();
    }

    @Post()
    async createCategory(
        @Body(new ParseBodyPipe(createCategoryRequestSchema))
        createCategoryRequest: CreateCategoryRequest,
    ): Promise<void> {
        return this.categoryService.createCategory(createCategoryRequest);
    }
}
