import { BaseError } from './base.error';

export interface FileSystemErrorJson {
    message: string;
}

export class FileSystemError extends BaseError<FileSystemErrorJson> {
    constructor(message: string) {
        super(message);

        this.name = 'FileSystemError';
    }

    public toJSON(): FileSystemErrorJson {
        return {
            message: this.message,
        };
    }
}