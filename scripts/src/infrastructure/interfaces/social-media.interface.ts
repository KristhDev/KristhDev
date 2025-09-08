import { ModelStatus } from './common.interfaces';

export type SocialMediaEndpoint = {
    id: string;
    name: string;
    badge: string;
    link: string;
    status: ModelStatus;
    created_at: string;
    updated_at: string;
}