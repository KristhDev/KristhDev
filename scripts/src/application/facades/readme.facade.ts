/* Constants */
import { markers, markersMessages } from '@application/constants';

/* Contracts */
import { LoggerAdapterContract } from '@domain/contracts/adapters';
import { ReadmeFacadeContract } from '@domain/contracts/facades';
import { ProjectsServiceContract, ReadmeServiceContract, SkillsServiceContract } from '@domain/contracts/services';

/* Errors */
import { MarkdownError } from '@domain/errors';

export class ReadmeFacade implements ReadmeFacadeContract {
    constructor(
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly projectsService: ProjectsServiceContract,
        private readonly skillsService: SkillsServiceContract,
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
            this.loggerAdapter.info('Updating banner section in README.md file');

            this.loggerAdapter.info('Generating banner section');
            const bannerSection = this.readmeService.generateBannerSection();
            this.loggerAdapter.success('Banner section generated successfully');

            this.loggerAdapter.info('Loading README.md file');
            const readmeContent = this.readmeService.loadReadme();
            this.loggerAdapter.success('README.md file loaded successfully');

            const startIndex = readmeContent.indexOf(markers.BANNER_SECTION_START);
            const endIndex = readmeContent.indexOf(markers.BANNER_SECTION_END);

            const hasStartMarker = startIndex !== -1;
            const hasEndMarker = endIndex !== -1;

            const hasMarkers = hasStartMarker && hasEndMarker;
            this.loggerAdapter.info('Checking if markers exist');

            const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.BANNER_SECTION_START.length) < endIndex);
            if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.BANNER_MAKERS_FAILED);
            this.loggerAdapter.success('Markers checked successfully');

            this.loggerAdapter.info('Updating banner section');
            const updatedReadmeContent = this.readmeService.updateSection({
                content: readmeContent,
                markers: { start: startIndex + markers.BANNER_SECTION_START.length, end: endIndex },
                newContent: bannerSection
            });

            this.readmeService.updateReadme(updatedReadmeContent);
            this.loggerAdapter.success('Banner section updated successfully in README.md file');
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Updates the social media section in the README.md file.
     *
     * The social media section is the section that contains the social media links of the user.
     *
     * @return {void} The updated content of the README.md file.
     * @throws {MarkdownError} If the social media section cannot be updated.
     */
    public updateSocialMediaSection(): void {
        try {
            this.loggerAdapter.info('Updating social media section in README.md file');

            this.loggerAdapter.info('Generating social media section');
            const socialMediaSection = this.readmeService.generateSocialMediaSection();
            this.loggerAdapter.success('Social media section generated successfully');

            this.loggerAdapter.info('Loading README.md file');
            const readmeContent = this.readmeService.loadReadme();
            this.loggerAdapter.success('README.md file loaded successfully');

            const startIndex = readmeContent.indexOf(markers.SOCIAL_MEDIA_SECTION_START);
            const endIndex = readmeContent.indexOf(markers.SOCIAL_MEDIA_SECTION_END);

            const hasStartMarker = startIndex !== -1;
            const hasEndMarker = endIndex !== -1;

            const hasMarkers = hasStartMarker && hasEndMarker;
            this.loggerAdapter.info('Checking if markers exist');

            const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.SOCIAL_MEDIA_SECTION_START.length) < endIndex);
            if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.SOCIAL_MEDIA_MAKERS_FAILED);
            this.loggerAdapter.success('Markers checked successfully');

            this.loggerAdapter.info('Updating social media section');
            const updatedReadmeContent = this.readmeService.updateSection({
                content: readmeContent,
                markers: { start: startIndex + markers.SOCIAL_MEDIA_SECTION_START.length, end: endIndex },
                newContent: socialMediaSection
            });

            this.readmeService.updateReadme(updatedReadmeContent);
            this.loggerAdapter.success('Social media section updated successfully in README.md file');
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
            this.loggerAdapter.info('Updating last projects section in README.md file');

            this.loggerAdapter.info('Getting latest projects');
            const projects = await this.projectsService.getLatest();
            this.loggerAdapter.success('Latest projects retrieved successfully');

            this.loggerAdapter.info('Generating projects table');
            const projectsTableRows = this.readmeService.generateProjectsTableRows(projects);

            let projectsTable = '\n<table align="center"> \n';
            projectsTable += projectsTableRows;
            projectsTable += '</table>\n';

            this.loggerAdapter.success('Projects table generated successfully');

            this.loggerAdapter.info('Loading README.md file');
            const readmeContent = this.readmeService.loadReadme();
            this.loggerAdapter.success('README.md file loaded successfully');

            this.loggerAdapter.info('Getting last projects section markers');
            const startIndex = readmeContent.indexOf(markers.PROJECTS_START);
            const endIndex = readmeContent.indexOf(markers.PROJECTS_END);
            this.loggerAdapter.success('Last projects section markers retrieved successfully');

            const hasStartMarker = startIndex !== -1;
            const hasEndMarker = endIndex !== -1;

            const hasMarkers = hasStartMarker && hasEndMarker;
            this.loggerAdapter.info('Checking if markers exist');

            const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.PROJECTS_START.length) < endIndex);
            if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.PROJECT_MAKERS_FAILED);
            this.loggerAdapter.success('Markers checked successfully');

            this.loggerAdapter.info('Updating last projects section');

            const updatedReadmeContent = this.readmeService.updateSection({
                content: readmeContent,
                markers: { start: startIndex + markers.PROJECTS_START.length, end: endIndex },
                newContent: projectsTable
            });

            this.readmeService.updateReadme(updatedReadmeContent);
            this.loggerAdapter.success('Projects section updated successfully in README.md file');
        }
        catch (error) {
            console.error(error);
        }
    }

    /**
     * Updates the skills section in the README.md file.
     *
     * The skills section is the section that contains the skills of the user.
     *
     * @return {Promise<void>} A Promise that resolves when the skills section has been updated.
     * @throws {MarkdownError} If the skills section cannot be updated.
     */
    public async updateSkillsSection(): Promise<void> {
        try {
            this.loggerAdapter.info('Updating skills section in README.md file');

            this.loggerAdapter.info('Getting skills');
            const skills = await this.skillsService.getAll();
            this.loggerAdapter.success('Skills retrieved successfully');

            this.loggerAdapter.info('Generating skills section');
            const skillsSection = this.readmeService.generateSkillsSection(skills);
            this.loggerAdapter.success('Skills section generated successfully');

            this.loggerAdapter.info('Loading README.md file');
            const readmeContent = this.readmeService.loadReadme();
            this.loggerAdapter.success('README.md file loaded successfully');

            const startIndex = readmeContent.indexOf(markers.SKILLS_START);
            const endIndex = readmeContent.indexOf(markers.SKILLS_END);

            const hasStartMarker = startIndex !== -1;
            const hasEndMarker = endIndex !== -1;

            const hasMarkers = hasStartMarker && hasEndMarker;
            this.loggerAdapter.info('Checking if markers exist');

            const areMarkersWellPositioned = hasMarkers && ((startIndex + markers.SKILLS_START.length) < endIndex);
            if (!hasMarkers || !areMarkersWellPositioned) throw new MarkdownError(markersMessages.SKILL_MAKERS_FAILED);
            this.loggerAdapter.success('Markers checked successfully');

            this.loggerAdapter.info('Updating skills section');
            const updatedReadmeContent = this.readmeService.updateSection({
                content: readmeContent,
                markers: { start: startIndex + markers.SKILLS_START.length, end: endIndex },
                newContent: skillsSection
            });

            this.readmeService.updateReadme(updatedReadmeContent);
            this.loggerAdapter.success('Skills section updated successfully in README.md file');
        } 
        catch (error) {
            console.error(error);
        }
    }
}