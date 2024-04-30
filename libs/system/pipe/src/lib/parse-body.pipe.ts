import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ParseBodyPipe implements PipeTransform {
    constructor(public readonly schema: ZodSchema) {}

    transform(value: unknown) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors
                    .map((err) => `${err.path.join('.')}: ${err.message}`)
                    .join('\n');
                throw new BadRequestException(errorMessage);
            }
            throw error;
        }
    }
}
