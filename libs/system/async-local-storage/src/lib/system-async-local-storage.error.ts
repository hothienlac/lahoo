export class AsyncLocalStorageError extends Error {
    constructor() {
        super(
            'No CLS context available, please make sure that you are running your code inside a CLS context.',
        );
    }
}
