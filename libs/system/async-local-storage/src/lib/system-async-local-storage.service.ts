/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorageError } from './system-async-local-storage.error';
import { asyncLocalStorage } from './async-local-storage';

@Injectable()
export class SystemAsyncLocalStorageService {
    set(key: string, value: any): void {
        const store = asyncLocalStorage.getStore();
        if (!store) {
            throw new AsyncLocalStorageError();
        }
        store[key] = value;
    }

    get(key: string): any {
        const store = asyncLocalStorage.getStore();
        return store?.[key] ?? undefined;
    }
}
