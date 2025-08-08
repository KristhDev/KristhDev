/* Env */
import { env } from '../../config/env';

/* Entities */
import { ProjectEntity } from '../../domain/entities';

/* Contracts */
import { MarkdownServiceContract, ReadmeServiceContract } from '../../domain/contracts/services';

/* Interfaces */
import { UpdateMarkdownSectionOptions } from '../interfaces';

export class ReadmeService implements ReadmeServiceContract {
    constructor(
        private readonly markdownService: MarkdownServiceContract
    ) {}

    /**
     * Loads the content of the README.md file in the root of the user's repository.
     * If no path is provided, it will try to find the README.md file in the root of
     * the user's repository.
     *
     * @param {string} [path] Path to the README.md file.
     * @return {string} The content of the README.md file.
     * @throws {Error} If the file cannot be read.
     */
    public loadReadme(path?: string): string {
        try {
            const readmePath = path || `${ process.cwd() }/../README.md`;
            return this.markdownService.loadMarkdown(readmePath);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Generates the banner section in the README.md file.
     *
     * This section is the first section of the README.md file and contains a
     * heading with the name of the user and a link to the user's portfolio.
     *
     * @return {string} The banner section in Markdown format.
     */
    public generateBannerSection(): string {
        let template = '<div align="center"> \n';
        template += `  <h1 align="center">Hola, soy <a href="${ env.PORTFOLIO_URL }">Kristhian Ferrufino 👋🏻</a></h1> \n`;
        template += '  <br/> \n\n';
        template += '  <a target="_blank"> \n';
        template += `    <img alt="Github banner Kristhian Ferrufino" width="100%" src="${ env.PORTFOLIO_BANNER_URL }"> \n`;
        template += '  </a> \n';
        template += '</div> \n';

        return template;
    }

    /**
     * Generates the rows for the projects table in the README.md file, given a list of projects.
     *
     * @param {ProjectEntity[]} projects List of projects.
     * @return {string} The rows of the projects table in Markdown format.
     */
    public generateProjectsTableRows(projects: ProjectEntity[]): string {
        const projectsToMarkdown = projects.map(project => {
            let template = '  <tr border="none"> \n';
            template += '    <td align="center"> \n';

            template += `      <img align="left" alt="${ project.name }" src="${ project.image }" width="50%"> \n`;
            template += '      <div align="right"> \n';
            template += `        <h3 align="center">${ project.name }</h3> \n`;
            template += '        <p align="left"> \n';
            template += `          ${ (project.description.length > 250 ? project.description.substring(0, 250) + '...' : project.description) } \n`;
            template += '        </p> \n';

            template += '        <div> \n\n';

            template += `[![${ project.name } Artículo ](https://img.shields.io/badge/Leer-brightgreen.svg?logo=readme&label=|&logoColor=FFFFFF)](${ env.PORTFOLIO_URL }/projects/${ project.slug })\n`;

            if (project.repositories && project.repositories.length > 0) {
                template += `[![${ project.name } Repositorio ](https://img.shields.io/badge/Repo-brightgreen.svg?logo=github&label=|)](${ project.repositories[0] })\n`;
            }

            if (project.url) {
                template += `[![${ project.name } Url ](https://img.shields.io/badge/Ver-brightgreen.svg?logo=realm&label=|)](${ project.url })\n`;
            }

            template += '        </div> \n';
            template += '      </div> \n';
            template += '    </td> \n';
            template += '  </tr> \n';

            return template;
        });

        return projectsToMarkdown.join('\n');
    }

    /**
     * Updates a section in a Markdown file, given the content of the file, the markers that define the 
     * section and the new content of the section.
     *
     * @param {UpdateMarkdownSectionOptions} options Options for updating the Markdown section.
     * @return {string} The updated content of the Markdown file.
     */
    public updateSection({ content, markers, newContent }: UpdateMarkdownSectionOptions): string {
        return this.markdownService.updateMarkdownSection({ content, markers, newContent });
    }

    /**
     * Updates the content of the README.md file in the root of the user's repository.
     *
     * @param {string} content The new content of the README.md file.
     * @param {string} [path] Path to the README.md file. If not provided, it will try to find the README.md file 
     * in the root of the user's repository.
     * @return {void} The updated content of the README.md file.
     * @throws {Error} If the file cannot be written.
     */
    public updateReadme(content: string, path?: string): void {
        try {
            const readmePath = path || `${ process.cwd() }/../README.md`;
            this.markdownService.updateMarkdown(content, readmePath);
        }
        catch (error) {
            throw error;
        }
    }
}