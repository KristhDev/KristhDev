/* Env */
import { env } from '@config/env';

/* Contracts */
import { ApiAdapterContract } from '@domain/contracts/adapters';
import { ProjectsServiceContract } from '@domain/contracts/services';

/* Entities */
import { ProjectEntity } from '@domain/entities';

/* Interfaces */
import { LastProjectsResponse } from '../interfaces';

export class ProjectsService implements ProjectsServiceContract {
    constructor(
        private readonly apiAdapter: ApiAdapterContract
    ) {}

    /**
     * Gets the latest projects from the API
     *
     * @return {Promise<ProjectEntity[]>} A promise that resolves with an array of ProjectEntity
     */
    public async getLatest(): Promise<ProjectEntity[]> {
        try {
            const url = `${ env.PORTFOLIO_API_URL }/projects/last`;
            const { projects } = await this.apiAdapter.get<LastProjectsResponse>(url);

            return projects.map(ProjectEntity.fromEndpoint);
        }
        catch (error) {
            throw error;
        }
    }
}