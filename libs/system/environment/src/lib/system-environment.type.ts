export class ParseEnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ParseEnvironmentError';
    }
}
