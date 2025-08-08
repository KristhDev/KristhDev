/* Contracts */
import { FileSystemAdapterContract } from '../../domain/contracts/adapters';
import { MarkdownServiceContract } from '../../domain/contracts/services';

/* Enums */
import { Encodings } from '../../domain/enums';

/* Interfaces */
import { UpdateMarkdownSectionOptions } from '../interfaces';

export class MarkdownService implements MarkdownServiceContract {
    constructor(
        private readonly fileSystemAdapter: FileSystemAdapterContract
    ) {}

    /**
     * Loads the content of a Markdown file, given the path to the file.
     *
     * @param {string} path Path to the Markdown file.
     * @return {string} The content of the Markdown file.
     * @throws {Error} If the file cannot be read.
     */
    public loadMarkdown(path: string): string {
        try {
            const readmePath = path;
            const readmeContent = this.fileSystemAdapter.readFile(readmePath, Encodings.UTF_8);

            return readmeContent;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Updates a section in a Markdown file, given the content of the file, the markers that define the section and the new content of the section.
     *
     * @param {UpdateMarkdownSectionOptions} options Options for updating the Markdown section.
     *
     * @returns {string} The updated content of the Markdown file.
     */
    public updateMarkdownSection({ content, markers, newContent }: UpdateMarkdownSectionOptions): string {
        const startContentPart = content.substring(0, markers.start);
        const endContentPart = content.substring(markers.end);

        return `${ startContentPart }\n${ newContent }\n${ endContentPart }`;
    }

    /**
     * Updates the content of a Markdown file, given the content and path to the file.
     *
     * @param {string} content The new content of the Markdown file.
     * @param {string} path Path to the Markdown file.
     * @return {void} The updated content of the Markdown file.
     * @throws {Error} If the file cannot be written.
     */
    public updateMarkdown(content: string, path: string): void {
        try {
            const readmePath = path;
            this.fileSystemAdapter.writeFile(readmePath, content);
        }
        catch (error) {
            throw error;
        }
    }
}