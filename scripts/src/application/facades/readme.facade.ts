/* Constants */
import { markers, markersMessages } from '../constants';

/* Contracts */
import { ReadmeFacadeContract } from '../../domain/contracts/facades';
import { ProjectsServiceContract, ReadmeServiceContract } from '../../domain/contracts/services';

/* Errors */
import { MarkdownError } from '../../domain/errors';

export class ReadmeFacade implements ReadmeFacadeContract {
    constructor(
        private readonly projectsService: ProjectsServiceContract,
        private readonly readmeService: ReadmeServiceContract
    ) {}

    /**
     * Updates the banner section in the README.md file.
     *
     * The banner section is the first section in the README.md file and contains
     * a heading with the name of the user and a link to the user's portfolio.
     *
     * @return {void} The updated content of the README.md file.
     * @throws {MarkdownError} If the banner section cannot be updated.
     */
    public updateBannerSection(): void {
        try {
            const bannerSection = this.readmeService.generateBannerSection();
            const readmeContent = this.readmeService.loadReadme();

            const startIndex = readmeContent.indexOf(markers.BANNER_SECTION_START);
            const endIndex = readmeContent.indexOf(markers.BANNER_SECTION_END);

            const hasStartMarker = startIndex !== -1;
            const hasEndMarker = endIndex !== -1;

            const hasMarkers = hasStartMarker && hasEndMarker;

            const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.BANNER_SECTION_START.length) < endIndex);
            if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.BANNER_MAKERS_FAILED);

            const updatedReadmeContent = this.readmeService.updateSection({
                content: readmeContent,
                markers: { start: startIndex + markers.BANNER_SECTION_START.length, end: endIndex },
                newContent: bannerSection
            });

            this.readmeService.updateReadme(updatedReadmeContent);
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Updates the projects section in the README.md file.
     *
     * The projects section is the last section in the README.md file and contains
     * a table with the latest projects.
     *
     * @return {Promise<void>} A Promise that resolves when the projects section has been updated.
     * @throws {MarkdownError} If the projects section cannot be updated.
     */
    public async updateLastProjectsSection(): Promise<void> {
        try {
            const projects = await this.projectsService.getLatest();
            const projectsTableRows = this.readmeService.generateProjectsTableRows(projects);

            let projectsTable = '<table align="center"> \n';
            projectsTable += projectsTableRows;
            projectsTable += '</table>';

            const readmeContent = this.readmeService.loadReadme();

            const startIndex = readmeContent.indexOf(markers.PROJECTS_START);
            const endIndex = readmeContent.indexOf(markers.PROJECTS_END);

            const hasStartMarker = startIndex !== -1;
            const hasEndMarker = endIndex !== -1;

            const hasMarkers = hasStartMarker && hasEndMarker;

            const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.PROJECTS_START.length) < endIndex);
            if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.PROJECT_MAKERS_FAILED);

            const updatedReadmeContent = this.readmeService.updateSection({
                content: readmeContent,
                markers: { start: startIndex + markers.PROJECTS_START.length, end: endIndex },
                newContent: projectsTable
            });

            this.readmeService.updateReadme(updatedReadmeContent);
        }
        catch (error) {
            console.error(error);
        }
    }
}