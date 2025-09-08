import { SocialMediaEntity } from '@domain/entities';

export abstract class SocialMediaServiceContract {
    public abstract getAll(): Promise<SocialMediaEntity[]>
}