import { Config, ConfigService } from '@lahoo/config';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user/user.type';
import { jwtConfigSchema, jwtPayloadSchema } from './jwt.type';
import {
    authenticationAccessTokenConfigKey,
    authenticationRefreshTokenConfigKey,
} from '../authentication.environment';
import { Jwt } from './jwt';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private readonly logger = new Logger(JwtService.name);
    private readonly accessTokenConfig: Config<typeof jwtConfigSchema>;
    private readonly refreshTokenConfig: Config<typeof jwtConfigSchema>;

    constructor(private readonly configService: ConfigService) {
        this.accessTokenConfig = this.configService.createConfig(
            authenticationAccessTokenConfigKey,
            jwtConfigSchema,
        );
        this.refreshTokenConfig = this.configService.createConfig(
            authenticationRefreshTokenConfigKey,
            jwtConfigSchema,
        );
    }

    createAccessToken(user: User): Jwt {
        return new Jwt(this.accessTokenConfig, user);
    }

    createRefreshToken(user: User): Jwt {
        return new Jwt(this.refreshTokenConfig, user);
    }

    getTokenUserId(token: string): string | null {
        const rawPayload = jwt.decode(token, { complete: true });
        if (!rawPayload) {
            return null;
        }
        const payload = jwtPayloadSchema.safeParse(rawPayload.payload);
        if (!payload.success) {
            return null;
        }
        return payload.data.userId;
    }
}
