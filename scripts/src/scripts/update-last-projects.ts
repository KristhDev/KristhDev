import { updateLastProjectsSectionOfReadmeUseCase } from '../config/di';

/**
 * Updates the projects section in the README.md file.
 *
 * The projects section is the last section in the README.md file and contains
 * a table with the latest projects.
 *
 * @returns {Promise<void>} A Promise that resolves when the projects section has been updated.
 */
const updateLastProjects = async (): Promise<void> => {
    try {
        await updateLastProjectsSectionOfReadmeUseCase.execute();
    }
    catch (error) {
        console.error(error);
    }
}

updateLastProjects();