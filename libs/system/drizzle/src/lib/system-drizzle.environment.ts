import { parseEnvironment } from '@lahoo/system-environment';
import { z } from 'zod';
import { Logger } from '@nestjs/common';

const logger = new Logger('Drizzle Environment');

export const drizzleEnvironmentSchema = z.object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_SSL: z.coerce.boolean(),
});

export type DrizzleEnvironment = z.infer<typeof drizzleEnvironmentSchema>;

export const drizzleEnvironment = parseEnvironment(drizzleEnvironmentSchema);

export const databaseHost = drizzleEnvironment.DATABASE_HOST;
export const databasePort = drizzleEnvironment.DATABASE_PORT;
export const databaseUsername = drizzleEnvironment.DATABASE_USERNAME;
export const databasePassword = drizzleEnvironment.DATABASE_PASSWORD;
export const databaseName = drizzleEnvironment.DATABASE_NAME;
export const databaseSSL = drizzleEnvironment.DATABASE_SSL;

logger.warn(`[Drizzle Environment] Database host: ${databaseHost}`);
logger.warn(`[Drizzle Environment] Database port: ${databasePort}`);
logger.warn(`[Drizzle Environment] Database username: ${databaseUsername}`);
logger.warn(`[Drizzle Environment] Database password: ${databasePassword}`);
logger.warn(`[Drizzle Environment] Database name: ${databaseName}`);
logger.warn(`[Drizzle Environment] Database SSL: ${databaseSSL}`);
