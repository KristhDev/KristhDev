export interface Markers {
    start: number;
    end: number;
}

export interface UpdateMarkdownSectionOptions {
    content: string;
    markers: Markers;
    newContent: string;
}