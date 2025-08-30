import { SkillEntity } from '../../entities';

export abstract class SkillsServiceContract {
    public abstract getAll(): Promise<SkillEntity[]>;
}