/* Contracts */
import { ReadmeFacadeContract } from '@domain/contracts/facades';
import { UpdateSocialMediaSectionOfReadmeUseCaseContract } from '@domain/contracts/usecases';

export class UpdateSocialMediaSectionOfReadmeUseCase implements UpdateSocialMediaSectionOfReadmeUseCaseContract {
    constructor(
        private readonly readmeFacade: ReadmeFacadeContract
    ) {}

    public async execute(): Promise<void> {
        try {
            await this.readmeFacade.updateSocialMediaSection();
        } 
        catch (error) {
            throw error;
        }
    }
}