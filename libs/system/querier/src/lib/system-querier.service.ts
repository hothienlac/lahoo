import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosInstance, Method, isAxiosError } from 'axios';
import { AXIOS_INSTANCE_INJECT_TOKEN } from './system-querier.constant';
import { QueryParams } from './system-querier.type';

@Injectable()
export class SystemQuerierService {
    private readonly logger = new Logger(SystemQuerierService.name);

    constructor(
        @Inject(AXIOS_INSTANCE_INJECT_TOKEN)
        protected readonly axios: AxiosInstance,
    ) {}

    async get<T>(
        url: string,
        queryParams?: QueryParams,
        headers?: Record<string, string>,
    ): Promise<T> {
        const queryParamsString = queryParams ? await this.processQueryParams(queryParams) : '';
        const urlWithQueryParams = queryParamsString ? `${url}?${queryParamsString}` : url;
        return this.request('GET', urlWithQueryParams, undefined, headers);
    }

    async post<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request('POST', url, data, headers);
    }

    async put<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request('PUT', url, data, headers);
    }

    async patch<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request('PATCH', url, data, headers);
    }

    async delete<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
        return this.request('DELETE', url, data, headers);
    }

    async request<T>(
        method: Method,
        url: string,
        data?: unknown,
        headers?: Record<string, string>,
    ): Promise<T> {
        try {
            const response = await this.axios.request({
                method,
                url,
                data,
                headers,
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                // Check timeout error
                if (error.code === 'ECONNABORTED') {
                    throw new HttpException('Timeout', 408);
                }
                throw new HttpException(error.response?.data, error.response?.status ?? 500);
            }
            throw error;
        }
    }

    private convertToString(value: string | number | boolean | Date): string {
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (typeof value === 'number') {
            return value.toString();
        }
        if (typeof value === 'boolean') {
            return value ? 'true' : 'false';
        }
        return value;
    }

    private async processQueryParams(queryParams: QueryParams): Promise<string> {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }
            if (Array.isArray(value)) {
                params.append(key, value.map((v) => this.convertToString(v)).join(','));
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                params.append(key, this.convertToString(value));
            }
        });
        return params.toString();
    }
}
