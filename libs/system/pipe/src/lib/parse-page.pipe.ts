import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePagePipe implements PipeTransform {
    transform(value: unknown): number {
        const page = Number(value);
        if (isNaN(page) || page < 1) {
            return 1;
        }
        return Math.floor(page);
    }
}
