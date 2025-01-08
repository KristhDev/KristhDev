import { env } from '../../config/env';

import { ApiAdapter } from '../adapters/api.adapter';

import { ProjectEntity } from '../../domain/entities/project.entity';

import { LastProjectsResponse } from '../interfaces/projects.interface';

export class ProjectsService {
    /**
     * Gets the latest projects from the API
     * @returns {Promise<ProjectEntity[]>} A promise that resolves with an array of ProjectEntity
     */
    public static async getLatest(): Promise<ProjectEntity[]> {
        try {
            const url = `${ env.PORTFOLIO_API_URL }/projects/last`;
            const { projects } = await ApiAdapter.get<LastProjectsResponse>(url);

            return projects.map(ProjectEntity.fromEndpoint);
        }
        catch (error) {
            throw error;
        }
    }
}