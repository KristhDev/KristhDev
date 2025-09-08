import { ModelStatus, SkillEndpoint, SkillType } from '@infrastructure/interfaces';

export class SkillEntity {
    private constructor(
        public id: string,
        public name: string,
        public type: SkillType,
        public badge: string,
        public image: string,
        public status: ModelStatus,
        public createdAt: string,
        public updatedAt: string
    ) {}

    public static fromEndpoint(endpoint: SkillEndpoint): SkillEntity {
        return new SkillEntity(
            endpoint.id,
            endpoint.name,
            endpoint.type,
            endpoint.badge,
            endpoint.image,
            endpoint.status,
            endpoint.created_at,
            endpoint.updated_at
        );
    }
}