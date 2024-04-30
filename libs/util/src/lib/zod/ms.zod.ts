import ms, { StringValue } from 'ms';
import { z, ZodType, ZodTypeDef } from 'zod';

export function msZod(defaultValue: StringValue): ZodType<number, ZodTypeDef, string> {
    return z
        .string()
        .optional()
        .default(defaultValue)
        .refine((value) => {
            const parsedValue = ms(value as StringValue);
            if (parsedValue === undefined || Number.isNaN(parsedValue)) {
                throw new Error('Invalid TTL format');
            }
            return true;
        })
        .transform((value) => ms(value as StringValue)) as ZodType<number, ZodTypeDef, string>;
}
