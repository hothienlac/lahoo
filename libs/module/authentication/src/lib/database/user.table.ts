import { varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { authenticationSchema } from './authentication.schema';
import { sql } from 'drizzle-orm';
import { User, userBiographySchema } from '../user/user.type';
import { InternalServerErrorException } from '@nestjs/common';

// CREATE TABLE IF NOT EXISTS authentication."user" (
//     user_id varchar DEFAULT gen_random_uuid() NOT NULL,
//     username varchar NOT NULL,
//     nickname varchar NULL,
//     email varchar NOT NULL,
//     biography jsonb DEFAULT '{}'::jsonb NOT NULL,
//     security_secret varchar DEFAULT gen_random_uuid() NOT NULL,
//     created_at varchar DEFAULT now() NOT NULL,
//     updated_at varchar DEFAULT now() NOT NULL,
//     CONSTRAINT user_pk PRIMARY KEY (user_id),
//     CONSTRAINT user_unique UNIQUE (email)
// );
export const userTable = authenticationSchema.table('user', {
    userId: varchar('user_id')
        .primaryKey()
        .notNull()
        .default(sql`gen_random_uuid()`),
    username: varchar('username').notNull(),
    nickname: varchar('nickname'),
    email: varchar('email').notNull().unique(),
    biography: jsonb('biography')
        .notNull()
        .default(sql`'{}'::jsonb`),
    securitySecret: varchar('security_secret')
        .notNull()
        .default(sql`gen_random_uuid()`),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .default(sql`now()`),
});

export type SelectUser = typeof userTable.$inferSelect;
export type SelectUsers = SelectUser[];
export type InsertUser = typeof userTable.$inferInsert;
export type InsertUsers = InsertUser[];

export function mapToUser(user: SelectUser): User {
    const parseBiography = userBiographySchema.safeParse(user.biography);
    if (!parseBiography.success) {
        throw new InternalServerErrorException(`Failed to parse biography for user ${user.userId}`);
    }
    return {
        userId: user.userId,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        biography: parseBiography.data,
        securitySecret: user.securitySecret,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
