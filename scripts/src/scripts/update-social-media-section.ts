import 'module-alias/register';
import '../../paths';

/* DI */
import { updateSocialMediaSectionOfReadmeUseCase } from '@config/di';

/**
 * Updates the social media section in the README.md file.
 *
 * The social media section is the first section in the README.md file and contains
 * a heading with the name of the user and a link to the user's portfolio.
 *
 * @returns {Promise<void>} A Promise that resolves when the banner section has been updated.
 */
const updateSocialMediaSection = async (): Promise<void> => {
    try {
        updateSocialMediaSectionOfReadmeUseCase.execute();
    }
    catch (error) {
        console.error(error);
    }
}

updateSocialMediaSection();