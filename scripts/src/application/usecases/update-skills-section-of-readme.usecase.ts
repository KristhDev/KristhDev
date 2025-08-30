/* Contracts */
import { ReadmeFacadeContract } from '../../domain/contracts/facades';
import { UpdateSkillsSectionOfReadmeUseCaseContract } from '../../domain/contracts/usecases';

export class UpdateSkillsSectionOfReadmeUseCase implements UpdateSkillsSectionOfReadmeUseCaseContract {
    constructor(
        private readonly readmeFacade: ReadmeFacadeContract
    ) {}

    public async execute(): Promise<void> {
        try {
            await this.readmeFacade.updateSkillsSection();
        } 
        catch (error) {
            throw error;
        }
    }
}