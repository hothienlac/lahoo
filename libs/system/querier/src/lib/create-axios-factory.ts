import { Logger } from '@nestjs/common';
import Axios from 'axios';
import { SystemQuerierOptions } from './system-querier.type';
import { DEFAULT_TIMEOUT } from './system-querier.constant';

const REQUEST_START_TIME_HEADER = 'request-start-time';

export function createAxiosFactory(config: SystemQuerierOptions) {
    const logger = new Logger(`SystemQuerierModule:${config.name}`);
    return () => {
        logger.log(
            `Creating Axios instance for ${config.name}, baseURL: ${config.axiosConfig.baseURL}`,
        );
        const axiosInstance = Axios.create({
            timeout: DEFAULT_TIMEOUT,
            ...config.axiosConfig,
        });
        axiosInstance.interceptors.request.use((request) => {
            logger.debug(`Calling Request to [${request.method?.toUpperCase()}]: ${request.url}`);
            request.headers[REQUEST_START_TIME_HEADER] = new Date().toISOString(); // Add a timestamp to the request
            return request;
        });
        axiosInstance.interceptors.response.use(
            (response) => {
                const startTime = new Date(response.config.headers[REQUEST_START_TIME_HEADER]);
                const endTime = new Date();
                const duration = endTime.getTime() - startTime.getTime();
                logger.log(
                    `Request to [${response.config.method?.toUpperCase()}]: ${
                        response.config.url
                    } responded successfully! Request duration: ${duration}ms.`,
                );
                return response;
            },
            (error) => {
                logger.error(
                    `Request to [${error.config?.method?.toUpperCase()}]: ${
                        error.config?.url
                    } resulted in an error: ${error.message}`,
                );
                logger.debug(`Error details: ${JSON.stringify(error.response?.data)}`);
                return Promise.reject(error);
            },
        );
        return axiosInstance;
    };
}
