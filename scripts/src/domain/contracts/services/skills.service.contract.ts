import { SkillEntity } from '@domain/entities';

export abstract class SkillsServiceContract {
    public abstract getAll(): Promise<SkillEntity[]>;
}