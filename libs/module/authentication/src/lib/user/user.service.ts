import { UnauthorizedException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserBiography, CreateUser, User } from './user.type';
import { SystemDrizzleService } from '@lahoo/system-drizzle';
import { eq, sql } from 'drizzle-orm';
import { JwtService } from '../jwt/jwt.service';
import { SelectUser, mapToUser, userTable } from '../database/user.table';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly systemDrizzleService: SystemDrizzleService,
        private readonly jwtService: JwtService,
    ) {}

    async getUserById(userId: string): Promise<User> {
        const users = await this.systemDrizzleService.drizzle
            .select()
            .from(userTable)
            .where(eq(userTable.userId, userId));
        if (users.length === 0) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return mapToUser(users[0]);
    }

    async getUserByEmail(email: string): Promise<User> {
        const users = await this.systemDrizzleService.drizzle
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));
        if (users.length === 0) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return mapToUser(users[0]);
    }

    async getUserByAccessToken(accessToken: string): Promise<User> {
        const userId = this.jwtService.getTokenUserId(accessToken);
        if (!userId) {
            throw new UnauthorizedException('Invalid access token');
        }
        const user = await this.getUserById(userId);
        const userAccessToken = this.jwtService.createAccessToken(user);
        const isAccessTokenValid = await userAccessToken.verifyToken(accessToken);
        if (!isAccessTokenValid) {
            throw new UnauthorizedException('Invalid access token');
        }
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

    async updateUserBiography(userId: string, biography: UserBiography): Promise<User> {
        const updateUserQuery = await this.systemDrizzleService.drizzle.execute<SelectUser>(sql`
            update "authentication"."user"
            set biography = biography || ${biography}
            where user_id = ${userId}
        `);
        if (updateUserQuery.length === 0) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return mapToUser(updateUserQuery[0]);
    }
}
