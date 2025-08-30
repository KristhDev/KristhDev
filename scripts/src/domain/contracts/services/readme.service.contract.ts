import { ProjectEntity, SkillEntity } from '../../entities';

import { UpdateMarkdownSectionOptions } from '../../../infrastructure/interfaces';

export abstract class ReadmeServiceContract {
    public abstract loadReadme(path?: string): string;
    public abstract generateBannerSection(): string;
    public abstract generateProjectsTableRows(projects: ProjectEntity[]): string;
    public abstract generateSkillsSection(skills: SkillEntity[]): string;
    public abstract updateReadme(content: string, path?: string): void;
    public abstract updateSection(options: UpdateMarkdownSectionOptions): string;
}