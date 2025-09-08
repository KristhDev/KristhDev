import 'module-alias/register';
import '../../paths';

/* DI */
import { updateSkillsSectionOfReadmeUseCase } from '@config/di';

/**
 * Updates the skills section in the README.md file.
 *
 * The skills section is the section that contains the skills of the user.
 *
 * @returns {Promise<void>} A Promise that resolves when the skills section has been updated.
 */
const updateSkillsSection = async (): Promise<void> => {
    try {
        await updateSkillsSectionOfReadmeUseCase.execute();
    }
    catch (error) {
        console.error(error);
    }
}

updateSkillsSection();