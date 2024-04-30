import { Config } from '@lahoo/config';
import { Logger } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.type';
import { JwtPayload, jwtConfigSchema, jwtPayloadSchema } from './jwt.type';

export class Jwt {
    private readonly logger = new Logger(Jwt.name);

    constructor(
        private readonly jwtConfig: Config<typeof jwtConfigSchema>,
        private readonly user: User,
    ) {}

    private async generateTokenSecret(): Promise<string> {
        const jwtConfig = await this.jwtConfig.get();
        return `${jwtConfig.tokenSecret}:${this.user.securitySecret}`;
    }

    async generateToken(): Promise<string> {
        const payload: JwtPayload = {
            userId: this.user.userId,
        };
        const jwtConfig = await this.jwtConfig.get();
        const secret = await this.generateTokenSecret();
        const token = jwt.sign(payload, secret, {
            expiresIn: jwtConfig.tokenExpiration,
        });
        return token;
    }

    async verifyToken(token: string): Promise<boolean> {
        const secret = await this.generateTokenSecret();
        try {
            jwt.verify(token, secret);
            return true;
        } catch (error) {
            return false;
        }
    }
}
