/* Constants */
import { markers, markersMessages } from '../application/constants/markers.constant';

/* Errors */
import { MarkdownError } from '../domain/errors/mardown.error';

/* Services */
import { ReadmeService } from '../infrastructure/services/readme.service';
import { ProjectsService } from '../infrastructure/services/projects.service';

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
        const projects = await ProjectsService.getLatest();
        const projectsTableRows = ReadmeService.generateProjectsTableRows(projects);

        let projectsTable = '<table align="center"> \n';
        projectsTable += projectsTableRows;
        projectsTable += '</table>';

        const readmeContent = ReadmeService.loadReadme();

        const startIndex = readmeContent.indexOf(markers.PROJECTS_START);
        const endIndex = readmeContent.indexOf(markers.PROJECTS_END);

        const hasStartMarker = startIndex !== -1;
        const hasEndMarker = endIndex !== -1;

        const hasMarkers = hasStartMarker && hasEndMarker;

        const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.PROJECTS_START.length) < endIndex);
        if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.PROJECT_MAKERS_FAILED);

        const updatedReadmeContent = ReadmeService.updateSection({
            content: readmeContent,
            markers: { start: startIndex + markers.PROJECTS_START.length, end: endIndex },
            newContent: projectsTable
        });

        ReadmeService.updateReadme(updatedReadmeContent);
    }
    catch (error) {
        console.error(error);
    }
}

updateLastProjects();