import { User } from '@lahoo/authentication';
import { AsyncLocalStorage } from 'async_hooks';

export const userStorage = new AsyncLocalStorage<User | null>();
