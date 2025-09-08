import { ModelStatus, SocialMediaEndpoint } from '@infrastructure/interfaces';

export class SocialMediaEntity {
    private constructor(
        public id: string,
        public name: string,
        public badge: string,
        public link: string,
        public status: ModelStatus,
        public createdAt: string,
        public updatedAt: string,
    ) {}

    public static fromEndpoint(endpoint: SocialMediaEndpoint): SocialMediaEntity {
        return new SocialMediaEntity(
            endpoint.id,
            endpoint.name,
            endpoint.badge,
            endpoint.link,
            endpoint.status,
            endpoint.created_at,
            endpoint.updated_at,
        );
    }
}