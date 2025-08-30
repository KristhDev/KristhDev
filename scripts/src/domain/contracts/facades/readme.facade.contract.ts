export abstract class ReadmeFacadeContract {
    public abstract updateBannerSection(): void;
    public abstract updateLastProjectsSection(): Promise<void>;
    public abstract updateSkillsSection(): Promise<void>;
}