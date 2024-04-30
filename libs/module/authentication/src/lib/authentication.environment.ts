import { Logger } from '@nestjs/common';
import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';

const logger = new Logger('Authentication Environment');

export const authenticationEnvironmentSchema = z.object({
    AUTHENTICATION_ACCESS_TOKEN_CONFIG_KEY: z.string().optional().default('AccessToken'),
    AUTHENTICATION_REFRESH_TOKEN_CONFIG_KEY: z.string().optional().default('RefreshToken'),
});

export const authenticationEnvironment = parseEnvironment(authenticationEnvironmentSchema);

export const authenticationAccessTokenConfigKey =
    authenticationEnvironment.AUTHENTICATION_ACCESS_TOKEN_CONFIG_KEY;
export const authenticationRefreshTokenConfigKey =
    authenticationEnvironment.AUTHENTICATION_REFRESH_TOKEN_CONFIG_KEY;

const logHeader = '[AuthenticationEnvironment]';

logger.warn(
    `${logHeader} Authentication Access Token Config Key: ${authenticationAccessTokenConfigKey}`,
);
logger.warn(
    `${logHeader} Authentication Refresh Token Config Key: ${authenticationRefreshTokenConfigKey}`,
);
