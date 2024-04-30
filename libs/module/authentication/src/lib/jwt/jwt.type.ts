import { z } from 'zod';

export const jwtPayloadSchema = z.object({
    userId: z.string(),
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export const jwtConfigSchema = z.object({
    tokenSecret: z.string(),
    tokenExpiration: z.number(),
});
export type JwtConfig = z.infer<typeof jwtConfigSchema>;
