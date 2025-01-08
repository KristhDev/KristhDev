import fs from 'fs';

import { fileSystemMessages } from '../../application/constants/file-system.constants';

import { FileSystemError } from '../../domain/errors/file-system.error';
import { Encodings } from '../../domain/enums/encodings.enum';

export class FileSystemAdapter {
    /**
     * Reads the content of a file.
     *
     * @param {string} path Path to the file to read.
     * @param {Encodings} encoding Encoding of the file.
     *
     * @returns {string} The content of the file.
     *
     * @throws {FileSystemError} If the file cannot be read.
     */
    public static readFile(path: string, encoding: Encodings): string {
        try {
            return fs.readFileSync(path, encoding);
        }
        catch (error) {
            console.error();
            const message = (error as Error).message || fileSystemMessages.FILE_NOT_READABLE;
            const fileSystemError = new FileSystemError(message);

            throw fileSystemError;
        }
    }

    /**
     * Writes content to a file.
     *
     * @param {string} path Path to the file to write.
     * @param {string} content Content to write to the file.
     *
     * @throws {FileSystemError} If the file cannot be written.
     */
    public static writeFile(path: string, content: string): void {
        try {
            fs.writeFileSync(path, content);
        }
        catch (error) {
            console.error();
            const message = (error as Error).message || fileSystemMessages.FILE_NOT_WRITABLE;
            const fileSystemError = new FileSystemError(message);

            throw fileSystemError;
        }
    }
}