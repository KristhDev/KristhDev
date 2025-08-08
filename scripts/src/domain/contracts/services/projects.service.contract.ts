import { ProjectEntity } from '../../entities';

export abstract class ProjectsServiceContract {
    public abstract getLatest(): Promise<ProjectEntity[]>;
}