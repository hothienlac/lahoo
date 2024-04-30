import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
    databaseHost,
    databaseName,
    databasePassword,
    databasePort,
    databaseSSL,
    databaseUsername,
} from './system-drizzle.environment';
import { QueryError } from './system-drizzle.type';
import { systemDrizzleLoggerBuilder } from './system-drizzle.logger';

@Injectable()
export class SystemDrizzleService {
    private readonly logger = new Logger(SystemDrizzleService.name);
    private readonly databaseClient: postgres.Sql;
    public readonly drizzle: PostgresJsDatabase;

    constructor() {
        this.databaseClient = postgres({
            host: databaseHost,
            port: databasePort,
            database: databaseName,
            user: databaseUsername,
            password: databasePassword,
            ssl: databaseSSL,
        });
        this.drizzle = drizzle(this.databaseClient, {
            logger: systemDrizzleLoggerBuilder({
                systemLogger: this.logger,
            }),
        });
    }

    checkDrizzleError(error: unknown): QueryError {
        if (!(error instanceof Error)) {
            throw new InternalServerErrorException(
                `Something weird happened, Drizzle not returning an Error: ${error}`,
            );
        }
        return error as QueryError;
    }
}
