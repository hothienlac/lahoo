import { Injectable, Logger } from '@nestjs/common';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { SystemCache, SystemCacheService } from '@lahoo/system-cache';
import { CreateCategoryRequest, Categories, categoriesSchema } from './category.type';
import { categoryTable } from '../database/category.table';

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

    private createCategoriesCache(): SystemCache<typeof categoriesSchema> {
        const cacheKey = `Categories`;
        return this.systemCacheService.createCache(
            cacheKey,
            categoriesSchema,
            this.getCategoriesFromDatabase.bind(this),
        );
    }

    async getCategories(): Promise<Categories> {
        const cache = this.createCategoriesCache();
        return cache.getOrReload();
    }

    async createCategory(request: CreateCategoryRequest): Promise<void> {
        this.logger.log(`Creating category ${request.categoryName}`);
        await this.systemDrizzleService.drizzle.insert(categoryTable).values(request);
        this.logger.debug(`Category ${request.categoryName} created`);
    }
}
