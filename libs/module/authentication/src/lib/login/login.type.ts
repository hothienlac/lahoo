import { z } from 'zod';

export const loginRequestSchema = z.object({
    idToken: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export type AccessToken = {
    accessToken: string;
};

export type RefreshToken = {
    refreshToken: string;
};
