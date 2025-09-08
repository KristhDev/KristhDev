import { BaseError } from './base.error';

export interface MarkdownErrorJson {
    error: string;
    message: string;
}

export class MarkdownError extends BaseError<MarkdownErrorJson> {
    constructor(message: string) {
        super(message);

        this.name = 'MarkdownError';
    }

    public toJSON(): MarkdownErrorJson {
        return {
            error: this.name,
            message: this.message,
        };
    }
}