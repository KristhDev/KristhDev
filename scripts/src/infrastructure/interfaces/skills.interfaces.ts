import { ModelStatus } from './common.interfaces';

export type SkillType = 'baas' | 'database' | 'framework' | 'language' | 'tool';

export type SkillEndpoint = {
    id: string;
    name: string;
    type: SkillType;
    badge: string;
    image: string;
    status: ModelStatus;
    created_at: string;
    updated_at: string;
}

export interface SkillsResponse {
    skills: SkillEndpoint[];
    status: number;
}