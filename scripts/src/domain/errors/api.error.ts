import { BaseError } from './base.error';

export interface ApiErrorJson {
    error: string;
    message: string;
    status: number;
    statusText: string;
    method: string;
    url: string;
}

export class ApiError extends BaseError<ApiErrorJson> {
    constructor(
        message: string,
        public status: number,
        public statusText: string,
        public method: string,
        public url: string,
    ) {
        super(message);
        this.name = 'ApiError';
    }

    public toJSON(): ApiErrorJson {
        return {
            error: this.name,
            message: this.message,
            status: this.status,
            statusText: this.statusText,
            method: this.method,
            url: this.url,
        };
    }
}