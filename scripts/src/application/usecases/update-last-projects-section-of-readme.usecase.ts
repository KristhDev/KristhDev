/* Contracts */
import { ReadmeFacadeContract } from '../../domain/contracts/facades';
import { UpdateLastProjectsSectionOfReadmeUseCaseContract } from '../../domain/contracts/usecases';

export class UpdateLastProjectsSectionOfReadmeUseCase implements UpdateLastProjectsSectionOfReadmeUseCaseContract {
    constructor(
        private readonly readmeFacade: ReadmeFacadeContract
    ) {}

    public async execute(): Promise<void> {
        try {
            await this.readmeFacade.updateLastProjectsSection();
        } 
        catch (error) {
            throw error;
        }
    }
}