import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service';
import { SystemFirebaseService } from '@lahoo/system-firebase';
import { AccessToken } from './login.type';
import { User } from '../user/user.type';

@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly systemFirebaseService: SystemFirebaseService,
    ) {}

    async login(idToken: string): Promise<AccessToken> {
        this.logger.debug('Someone is trying to login');
        const decodedIdToken = await this.systemFirebaseService.checkIdToken(idToken);
        if (!decodedIdToken.email) {
            throw new UnauthorizedException('Something wring with idToken, email not found');
        }
        let user: User;
        try {
            user = await this.userService.getUserByEmail(decodedIdToken.email);
            this.logger.log(`User found: ${user.email}`);
        } catch (error) {
            this.logger.log(`User not found: ${decodedIdToken.email}, creating new user`);
            if (!decodedIdToken['name']) {
                throw new UnauthorizedException('Something wring with idToken, name not found');
            }
            user = await this.userService.createUser({
                username: decodedIdToken['name'],
                email: decodedIdToken.email,
            });
        }
        if (user.biography.avatar !== decodedIdToken.picture) {
            this.logger.log('User avatar outdated, updating');
            user = await this.userService.updateUserBiography(user.userId, {
                avatar: decodedIdToken.picture,
            });
        }
        this.logger.debug('All checks passed, generating access token');
        const accessToken = this.jwtService.createAccessToken(user);
        return {
            accessToken: await accessToken.generateToken(),
        };
    }
}
