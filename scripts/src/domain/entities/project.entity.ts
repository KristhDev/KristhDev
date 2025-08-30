/* Interfaces */
import { ProjectEndpoint } from '../../infrastructure/interfaces/projects.interface';

export class ProjectEntity {
    private constructor(
        public id: string,
        public name: string,
        public slug: string,
        public description: string,
        public image: string | null,
        public body: string,
        public url: string | null,
        public repositories: string[],
        public technologies: string[] | null,
        public createdAt: string,
        public updatedAt: string
    ) {}

    /**
     * Creates a new ProjectEntity from a ProjectEndpoint
     *
     * @param {ProjectEndpoint} endpoint
     * @return {ProjectEntity}
     */
    public static fromEndpoint(endpoint: ProjectEndpoint): ProjectEntity {
        return new ProjectEntity(
            endpoint.id,
            endpoint.name,
            endpoint.slug,
            endpoint.description,
            endpoint.image,
            endpoint.body,
            endpoint.url,
            endpoint.repositories,
            endpoint.technologies,
            endpoint.created_at,
            endpoint.updated_at
        );
    }
}