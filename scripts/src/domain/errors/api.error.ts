export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string,
    ) {
        super(message);
        this.message;
    }
}