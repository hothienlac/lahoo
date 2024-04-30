import { User } from '@lahoo/authentication';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { userStorage } from './user.async-storage';
import { API_User } from '@lahoo/api';

@Injectable()
export class SystemAuthenticationService {
    private readonly logger = new Logger(SystemAuthenticationService.name);

    getUser(): User {
        const user = userStorage.getStore() ?? null;
        if (!user) {
            throw new UnauthorizedException('This api requires user to be logged in.');
        }
        return user;
    }

    removeUserSecuredFields(user: User): API_User {
        return {
            userId: user.userId,
            email: user.email,
            username: user.username,
            nickname: user.nickname,
            biography: user.biography,
        };
    }
}
