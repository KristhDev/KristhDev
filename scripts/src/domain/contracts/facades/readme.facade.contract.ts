export abstract class ReadmeFacadeContract {
    public abstract updateBannerSection(): void;
    public abstract updateLastProjectsSection(): Promise<void>;
}