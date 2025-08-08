import { updateBannerSectionOfReadmeUseCase } from '../config/di';

/**
 * Updates the banner section in the README.md file.
 *
 * The banner section is the first section in the README.md file and contains
 * a heading with the name of the user and a link to the user's portfolio.
 *
 * @returns {Promise<void>} A Promise that resolves when the banner section has been updated.
 */
const updateBannerSection = async (): Promise<void> => {
    try {
        updateBannerSectionOfReadmeUseCase.execute();
    }
    catch (error) {
        console.error(error);
    }
}

updateBannerSection();