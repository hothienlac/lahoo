import { z } from 'zod';

export const API_userBiographySchema = z
    .object({
        avatar: z.string(),
    })
    .partial();
export type API_UserBiography = z.infer<typeof API_userBiographySchema>;

export type API_User = {
    userId: string;
    email: string;
    username: string;
    nickname: string | null;
    biography: API_UserBiography;
};
export type API_Users = API_User[];
