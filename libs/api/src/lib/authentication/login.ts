import { z } from 'zod';

export const API_loginRequestSchema = z.object({
    idToken: z.string(),
});
export type API_LoginRequest = z.infer<typeof API_loginRequestSchema>;

export type API_AccessToken = {
    accessToken: string;
};

export type API_RefreshToken = {
    refreshToken: string;
};
