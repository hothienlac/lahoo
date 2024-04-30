import { HttpException, HttpStatus } from '@nestjs/common';
import { RawAxiosRequestConfig } from 'axios';

export type SystemQuerierOptions = {
    name: string;
    axiosConfig: RawAxiosRequestConfig;
};

export class QueryServiceError extends HttpException {
    constructor(service: string, url: string) {
        const message = `Error querying:  ${service}/${url}`;
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = 'QueryServiceError';
    }
}

export type AllowedQueryType =
    | string
    | number
    | boolean
    | Date
    | string[]
    | number[]
    | boolean[]
    | Date[]
    | undefined;
export type QueryParams = Record<string, AllowedQueryType>;
