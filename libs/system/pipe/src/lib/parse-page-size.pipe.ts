import { Injectable, PipeTransform } from '@nestjs/common';
import { pipeDefaultPageSize, pipeMaxPageSize } from './system-pipe.environment';

type ParsePageSizePipeOptions = {
    maxPageSize?: number;
    defaultPageSize?: number;
};

@Injectable()
export class ParsePageSizePipe implements PipeTransform {
    maxPageSize: number;
    defaultPageSize: number;

    constructor(options?: ParsePageSizePipeOptions) {
        this.maxPageSize = options?.maxPageSize ?? pipeMaxPageSize;
        this.defaultPageSize = options?.defaultPageSize ?? pipeDefaultPageSize;
    }

    transform(value: unknown): number {
        const pageSize = Number(value);
        if (isNaN(pageSize) || pageSize < 1) {
            return this.defaultPageSize;
        }
        if (pageSize > this.maxPageSize) {
            return this.maxPageSize;
        }
        return Math.floor(pageSize);
    }
}
