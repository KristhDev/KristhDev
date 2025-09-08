import { BaseError } from './base.error';

export interface FileSystemErrorJson {
    error: string;
    message: string;
}

export class FileSystemError extends BaseError<FileSystemErrorJson> {
    constructor(message: string) {
        super(message);

        this.name = 'FileSystemError';
    }

    public toJSON(): FileSystemErrorJson {
        return {
            error: this.name,
            message: this.message,
        };
    }
}