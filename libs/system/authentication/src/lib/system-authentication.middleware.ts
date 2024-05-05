import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { userStorage } from './user.async-storage';
import { User, UserService } from '@lahoo/authentication';

@Injectable()
export class SystemAuthenticationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(SystemAuthenticationMiddleware.name);

    constructor(private readonly userService: UserService) {}

    getAccessToken(request: Request): string | undefined {
        const authorization = request.headers['authorization'];
        return authorization ? authorization.split(' ')[1] : undefined;
    }

    use(request: Request, response: Response, next: NextFunction): void {
        this.logger.debug('Authenticating request');
        const accessToken = this.getAccessToken(request);
        if (!accessToken) {
            this.logger.log('No access token found in request');
            userStorage.run(null, () => next());
            return;
        }
        this.userService
            .getUserByAccessToken(accessToken)
            .then((user: User) => {
                this.logger.log(`Found user: ${user.email}`);
                return userStorage.run(user, () => next());
            })
            .catch(() => {
                this.logger.log('TOKEN INVALID, treating as anonymous user');
                return userStorage.run(null, () => next());
            });
    }
}
