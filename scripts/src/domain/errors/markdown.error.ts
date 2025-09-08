import { BaseError } from './base.error';

export interface MarkdownErrorJson {
    message: string;
}

export class MarkdownError extends BaseError<MarkdownErrorJson> {
    constructor(message: string) {
        super(message);

        this.name = 'MarkdownError';
    }

    public toJSON(): MarkdownErrorJson {
        return {
            message: this.message,
        };
    }
}