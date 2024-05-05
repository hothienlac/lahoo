import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { SingleItemCache, SystemCacheService } from '@lahoo/system-cache';
import {
    CreateCategoryRequest,
    Categories,
    categoriesSchema,
    Category,
    categorySchema,
} from './category.type';
import { categoryTable } from '../database/category.table';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);

    constructor(
        private readonly systemDrizzleService: SystemDrizzleService,
        private readonly systemCacheService: SystemCacheService,
    ) {}

    private async getCategoriesFromDatabase(): Promise<Categories> {
        const categories = await this.systemDrizzleService.drizzle.select().from(categoryTable);
        return categories;
    }

    private createCategoriesCache(): SingleItemCache<typeof categoriesSchema> {
        const cacheKey = `Categories`;
        return this.systemCacheService.createSingleItemCache(
            cacheKey,
            categoriesSchema,
            this.getCategoriesFromDatabase.bind(this),
        );
    }

    private async getCategoryFromDatabase(categoryId: string): Promise<Category> {
        const category = await this.systemDrizzleService.drizzle
            .select()
            .from(categoryTable)
            .where(eq(categoryTable.categoryId, categoryId))
            .limit(1);
        if (category.length === 0) {
            throw new NotFoundException(`Category with id ${categoryId} not found`);
        }
        return category[0];
    }

    private createCategoryCache(categoryId: string): SingleItemCache<typeof categorySchema> {
        const cacheKey = `Category:${categoryId}`;
        return this.systemCacheService.createSingleItemCache(
            cacheKey,
            categorySchema,
            this.getCategoryFromDatabase.bind(this, categoryId),
        );
    }

    private async getCategoryByNameFromDatabase(categoryName: string): Promise<Category> {
        const category = await this.systemDrizzleService.drizzle
            .select()
            .from(categoryTable)
            .where(eq(categoryTable.categoryName, categoryName))
            .limit(1);
        if (category.length === 0) {
            throw new NotFoundException(`Category with name ${categoryName} not found`);
        }
        return category[0];
    }

    private createCategoryByNameCache(categoryName: string): SingleItemCache<typeof categorySchema> {
        const cacheKey = `Category:ByName:${categoryName}`;
        return this.systemCacheService.createSingleItemCache(
            cacheKey,
            categorySchema,
            this.getCategoryByNameFromDatabase.bind(this, categoryName),
        );
    }

    async getCategories(): Promise<Categories> {
        const cache = this.createCategoriesCache();
        return cache.getOrReload();
    }

    async getCategory(categoryId: string): Promise<Category> {
        const cache = this.createCategoryCache(categoryId);
        return cache.getOrReload();
    }

    async getCategoryByName(categoryName: string): Promise<Category> {
        const cache = this.createCategoryByNameCache(categoryName);
        return cache.getOrReload();
    }

    async createCategory(request: CreateCategoryRequest): Promise<void> {
        this.logger.log(`Creating category ${request.categoryName}`);
        try {
            await this.getCategoryByName(request.categoryName);
            throw new BadRequestException(`Category ${request.categoryName} already exists`);
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.logger.debug(`Category ${request.categoryName} not found, allow to create.`);
            } else {
                throw error;
            }
        }
        await this.systemDrizzleService.drizzle.insert(categoryTable).values({
            categoryName: request.categoryName,
            description: request.description,
        });
        this.logger.debug(`Category ${request.categoryName} created`);
        try {
            const cache = this.createCategoriesCache();
            await cache.clear();
            this.logger.debug('Cleared categories cache');
        } catch {
            this.logger.warn('Failed to clear categories cache. Cache may be inconsistent.');
        }
    }
}
