import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { SingleItemCache, SystemCacheService } from '@lahoo/system-cache';
import { CreateLabelRequest, Labels, labelsSchema, Label, labelSchema } from './label.type';
import { labelTable } from '../database/label.table';
import { eq } from 'drizzle-orm';

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

    private createLabelsCache(): SingleItemCache<typeof labelsSchema> {
        const cacheKey = `Labels`;
        return this.systemCacheService.createSingleItemCache(
            cacheKey,
            labelsSchema,
            this.getLabelsFromDatabase.bind(this),
        );
    }

    private async getLabelFromDatabase(labelId: string): Promise<Label> {
        const label = await this.systemDrizzleService.drizzle
            .select()
            .from(labelTable)
            .where(eq(labelTable.labelId, labelId))
            .limit(1);
        if (label.length === 0) {
            throw new NotFoundException(`Label with id ${labelId} not found`);
        }
        return label[0];
    }

    private createLabelCache(labelId: string): SingleItemCache<typeof labelSchema> {
        const cacheKey = `Label:${labelId}`;
        return this.systemCacheService.createSingleItemCache(
            cacheKey,
            labelSchema,
            this.getLabelFromDatabase.bind(this, labelId),
        );
    }

    private async getLabelByNameFromDatabase(labelName: string): Promise<Label> {
        const label = await this.systemDrizzleService.drizzle
            .select()
            .from(labelTable)
            .where(eq(labelTable.labelName, labelName))
            .limit(1);
        if (label.length === 0) {
            throw new NotFoundException(`Label with name ${labelName} not found`);
        }
        return label[0];
    }

    private createLabelByNameCache(labelName: string): SingleItemCache<typeof labelSchema> {
        const cacheKey = `Label:ByName:${labelName}`;
        return this.systemCacheService.createSingleItemCache(
            cacheKey,
            labelSchema,
            this.getLabelByNameFromDatabase.bind(this, labelName),
        );
    }

    async getLabels(): Promise<Labels> {
        const cache = this.createLabelsCache();
        return cache.getOrReload();
    }

    async getLabel(labelId: string): Promise<Label> {
        const cache = this.createLabelCache(labelId);
        return cache.getOrReload();
    }

    async getLabelByName(labelName: string): Promise<Label> {
        const cache = this.createLabelByNameCache(labelName);
        return cache.getOrReload();
    }

    async createLabel(request: CreateLabelRequest): Promise<void> {
        this.logger.log(`Creating label ${request.labelName}`);
        try {
            await this.getLabelByName(request.labelName);
            throw new BadRequestException(`Label ${request.labelName} already exists`);
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.logger.debug(`Label ${request.labelName} not found, allow to create.`);
            } else {
                throw error;
            }
        }
        await this.systemDrizzleService.drizzle.insert(labelTable).values({
            labelName: request.labelName,
            labelValue: request.labelValue,
        });
        this.logger.debug(`Label ${request.labelName} created`);
        try {
            const cache = this.createLabelsCache();
            await cache.clear();
            this.logger.debug('Labels cache cleared');
        } catch {
            this.logger.warn('Failed to clear labels cache. Cache may be inconsistent.');
        }
    }
}
