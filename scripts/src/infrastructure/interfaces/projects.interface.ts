export type ProjectEndpoint = {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    body: string;
    url: string | null;
    repositories: string[];
    technologies: string[] | null;
    created_at: string;
    updated_at: string;
}

export interface LastProjectsResponse {
    projects: ProjectEndpoint[];
    status: number;
}