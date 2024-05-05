import { z } from 'zod';

export const userBiographySchema = z
    .object({
        avatar: z.string(),
    })
    .partial();
export type UserBiography = z.infer<typeof userBiographySchema>;

export const userSchema = z.object({
    userId: z.string(),
    email: z.string(),
    username: z.string(),
    nickname: z.string().nullable(),
    biography: userBiographySchema,
    securitySecret: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
export type Users = User[];

export const createUserSchema = z.object({
    username: z.string(),
    email: z.string(),
});
export type CreateUser = z.infer<typeof createUserSchema>;
