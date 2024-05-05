import {
    Categories,
    Category,
    CategoryService,
    CreateCategoryRequest,
    createCategoryRequestSchema,
} from '@lahoo/store';
import { ParseBodyPipe } from '@lahoo/system-pipe';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getCategories(): Promise<Categories> {
        return this.categoryService.getCategories();
    }

    @Get(':categoryId')
    async getCategory(@Param('categoryId') categoryId: string): Promise<Category> {
        return this.categoryService.getCategory(categoryId);
    }

    @Post()
    async createCategory(
        @Body(new ParseBodyPipe(createCategoryRequestSchema))
        createCategoryRequest: CreateCategoryRequest,
    ): Promise<void> {
        return this.categoryService.createCategory(createCategoryRequest);
    }

    // @Put(':categoryId')
}
