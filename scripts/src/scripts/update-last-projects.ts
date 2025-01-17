import { markers, markersMessages } from '../application/constants/markers.constant';
import { MarkdownError } from '../domain/errors/mardown.error';

import { ReadmeService } from '../infrastructure/services/readme.service';
import { ProjectsService } from '../infrastructure/services/projects.service';

const updateLastProjects = async () => {
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