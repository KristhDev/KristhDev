import { Encodings } from '../../enums';

export abstract class FileSystemAdapterContract {
    public abstract readFile(path: string, encoding: Encodings): string
    public abstract writeFile(path: string, content: string): void;
}