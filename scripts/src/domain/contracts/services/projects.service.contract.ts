import { ProjectEntity } from '@domain/entities';

export abstract class ProjectsServiceContract {
    public abstract getLatest(): Promise<ProjectEntity[]>;
}