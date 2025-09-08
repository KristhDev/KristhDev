/* Contracts */
import { ReadmeFacadeContract } from '@domain/contracts/facades';
import { UpdateBannerSectionOfReadmeUseCaseContract } from '@domain/contracts/usecases';

export class UpdateBannerSectionOfReadmeUseCase implements UpdateBannerSectionOfReadmeUseCaseContract {
    constructor(
        private readonly readmeFacade: ReadmeFacadeContract
    ) {}

    public execute(): void {
        try {
            this.readmeFacade.updateBannerSection();
        } 
        catch (error) {
            throw error;
        }
    }
}