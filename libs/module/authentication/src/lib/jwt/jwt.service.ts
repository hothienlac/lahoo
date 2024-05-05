import { ConfigManager, ConfigService } from '@lahoo/config';
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
    private readonly accessTokenConfigManager: ConfigManager<typeof jwtConfigSchema>;
    private readonly refreshTokenConfigManager: ConfigManager<typeof jwtConfigSchema>;

    constructor(private readonly configService: ConfigService) {
        this.accessTokenConfigManager = this.configService.createConfig(
            authenticationAccessTokenConfigKey,
            jwtConfigSchema,
        );
        this.refreshTokenConfigManager = this.configService.createConfig(
            authenticationRefreshTokenConfigKey,
            jwtConfigSchema,
        );
    }

    createAccessToken(user: User): Jwt {
        return new Jwt(this.accessTokenConfigManager, user);
    }

    createRefreshToken(user: User): Jwt {
        return new Jwt(this.refreshTokenConfigManager, user);
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
