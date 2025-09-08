import { UpdateMarkdownSectionOptions } from '@infrastructure/interfaces';

export abstract class MarkdownServiceContract {
    public abstract loadMarkdown(path: string): string;
    public abstract updateMarkdownSection(options: UpdateMarkdownSectionOptions): string;
    public abstract updateMarkdown(content: string, path: string): void;
}