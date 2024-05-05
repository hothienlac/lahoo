import { SystemCacheService, SystemCache } from '@lahoo/system-cache';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { Injectable, Logger } from '@nestjs/common';
import { labelTable } from '../database/label.table';
import { CreateLabelRequest, Labels, labelsSchema } from './label.type';

@Injectable()
export class LabelService {
    private readonly logger = new Logger(LabelService.name);

    constructor(
        private readonly systemDrizzleService: SystemDrizzleService,
        private readonly systemCacheService: SystemCacheService,
    ) {}

    private async getLabelsFromDatabase(): Promise<Labels> {
        const labels = await this.systemDrizzleService.drizzle.select().from(labelTable);
        return labels;
    }

    private createLabelsCache(): SystemCache<typeof labelsSchema> {
        const cacheKey = `Labels`;
        return this.systemCacheService.createCache(
            cacheKey,
            labelsSchema,
            this.getLabelsFromDatabase.bind(this),
        );
    }

    async getLabels(): Promise<Labels> {
        const cache = this.createLabelsCache();
        return cache.getOrReload();
    }

    async createLabel(request: CreateLabelRequest): Promise<void> {
        this.logger.log(`Creating label ${request.labelName}`);
        await this.systemDrizzleService.drizzle.insert(labelTable).values(request);
        this.logger.debug(`Label ${request.labelName} created`);
    }
}
