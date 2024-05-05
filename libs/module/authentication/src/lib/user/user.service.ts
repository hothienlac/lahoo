import { UnauthorizedException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserBiography, CreateUser, User, userSchema } from './user.type';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { eq, sql } from 'drizzle-orm';
import { JwtService } from '../jwt/jwt.service';
import { SelectUser, mapToUser, userTable } from '../database/user.table';
import { SystemCache, SystemCacheService } from '@lahoo/system-cache';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly systemDrizzleService: SystemDrizzleService,
        private readonly systemCacheService: SystemCacheService,
        private readonly jwtService: JwtService,
    ) {}

    private async getUserByIdFromDatabase(userId: string): Promise<User> {
        const users = await this.systemDrizzleService.drizzle
            .select()
            .from(userTable)
            .where(eq(userTable.userId, userId));
        if (users.length === 0) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return mapToUser(users[0]);
    }

    private createUserCacheByUserId(userId: string): SystemCache<typeof userSchema> {
        const cacheKey = `User:UserId:${userId}`;
        return this.systemCacheService.createCache(
            cacheKey,
            userSchema,
            this.getUserByIdFromDatabase.bind(this, userId),
        );
    }

    private async getUserByEmailFromDatabase(email: string): Promise<User> {
        const users = await this.systemDrizzleService.drizzle
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));
        if (users.length === 0) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return mapToUser(users[0]);
    }

    private createUserCacheByEmail(email: string): SystemCache<typeof userSchema> {
        const cacheKey = `User:Email:${email}`;
        return this.systemCacheService.createCache(
            cacheKey,
            userSchema,
            this.getUserByEmailFromDatabase.bind(this, email),
        );
    }

    async getUserById(userId: string): Promise<User> {
        const cache = this.createUserCacheByUserId(userId);
        return cache.getOrReload();
    }

    async getUserByEmail(email: string): Promise<User> {
        const cache = this.createUserCacheByEmail(email);
        return cache.getOrReload();
    }

    async getUserByAccessToken(accessToken: string): Promise<User> {
        this.logger.debug('Getting user by accessToken');
        const userId = this.jwtService.getTokenUserId(accessToken);
        if (!userId) {
            throw new UnauthorizedException('Invalid access token');
        }
        this.logger.verbose(`Find user with id ${userId}`);
        const user = await this.getUserById(userId);
        this.logger.verbose('User found');
        const userAccessToken = this.jwtService.createAccessToken(user);
        const isAccessTokenValid = await userAccessToken.verifyToken(accessToken);
        if (!isAccessTokenValid) {
            throw new UnauthorizedException('Invalid access token');
        }
        this.logger.debug('User authenticated, valid accessToken');
        return user;
    }

    async createUser(createUser: CreateUser): Promise<User> {
        const user = await this.systemDrizzleService.drizzle
            .insert(userTable)
            .values({
                username: createUser.username,
                email: createUser.email,
            })
            .returning();
        return mapToUser(user[0]);
    }

    async updateUserSecuritySecret(userId: string): Promise<void> {
        const cache = this.createUserCacheByUserId(userId);
        const updatedUsers = await this.systemDrizzleService.drizzle
            .update(userTable)
            .set({
                securitySecret: randomUUID(),
            })
            .where(eq(userTable.userId, userId));
        if (updatedUsers.length === 0) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        await cache.clear();
    }

    async updateUserBiography(userId: string, biography: UserBiography): Promise<User> {
        const cache = this.createUserCacheByUserId(userId);
        const updateUserQuery = await this.systemDrizzleService.drizzle.execute<SelectUser>(sql`
            update "authentication"."user"
            set biography = biography || ${biography}
            where user_id = ${userId}
        `);
        if (updateUserQuery.length === 0) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        await cache.clear();
        return mapToUser(updateUserQuery[0]);
    }
}
