import { FileSystemAdapter } from '../adapters/file-system.adapter';

import { ProjectEntity } from '../../domain/entities/project.entity';
import { Encodings } from '../../domain/enums/encodings.enum';

import { UpdateMarkdownSectionOptions } from '../interfaces/markdown.interfaces';

export class MarkdownService {
    /**
     * Loads the content of the README.md file in the root of the user's repository.
     * If no path is provided, it will try to find the README.md file in the root of
     * the user's repository.
     *
     * @param {string} [path] Path to the README.md file.
     *
     * @returns {string} The content of the README.md file.
     *
     * @throws {Error} If the file cannot be read.
     */
    public static loadReadme(path?: string): string {
        try {
            const readmePath = path || `${ process.cwd() }/../README.md`;
            const readmeContent = FileSystemAdapter.readFile(readmePath, Encodings.UTF_8);

            return readmeContent;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Generates the rows for the projects table in the README.md file, given a list of projects.
     *
     * @param {ProjectEntity[]} projects List of projects.
     *
     * @returns {string} The rows of the projects table in Markdown format.
     */
    public static generateProjectsTableRows(projects: ProjectEntity[]): string {
        const projectsToMarkdown = projects.map(project => {
            let template = '    <tr border="none"> \n';
            template += '         <td align="center"> \n';

            template += `        <img align="left" alt="${ project.name }" src="${ project.image }" width="50%" /> \n`;
            template += '        <div align="right"> \n';
            template += `          <h3 align="center">${ project.name }</h3> \n`;
            template += '          <p align="left">' + (project.description.length > 250 ? project.description.substring(0, 250) + '...' : project.description) + '</p> \n';

            template += '          <div> \n';

            template += `            <a href="${ process.env.PORTFOLIO_URL }/projects/${ project.slug }" target="_blank" rel="noopener noreferrer"> \n`;
            template += `              <img alt="${ project.name }" src="https://img.shields.io/badge/Leer-brightgreen.svg?logo=readme&label=|&logoColor=FFFFFF" /> \n`;
            template += '            </a> \n';

            if (project.url || (project.repositories && project.repositories.length > 0)) {
                if (project.repositories && project.repositories.length > 0) {
                    template += `            <a href="${ project.repositories[0] }" target="_blank" rel="noopener noreferrer"> \n`;
                    template += `              <img alt="${ project.name }" src="https://img.shields.io/badge/Repo-brightgreen.svg?logo=github&label=|" /> \n`;
                    template += '            </a> \n';
                }

                if (project.url) {
                    template += `            <a href="${ project.url }" target="_blank" rel="noopener noreferrer"> \n`;
                    template += `              <img alt="${ project.name }" src="https://img.shields.io/badge/Ver-brightgreen.svg?logo=realm&label=|" /> \n`;
                    template += '            </a> \n';
                }
            }

            template += '          </div> \n';
            template += '        </div> \n';
            template += '      </td> \n';
            template += '    </tr> \n';

            return template;
        });

        return projectsToMarkdown.join('');
    }

    /**
     * Updates a section in a Markdown file, given the content of the file, the markers that define the section and the new content of the section.
     *
     * @param {UpdateMarkdownSectionOptions} options Options for updating the Markdown section.
     *
     * @returns {string} The updated content of the Markdown file.
     */
    public static updateMarkdownSection({ content, markers, newContent }: UpdateMarkdownSectionOptions): string {
        const startContentPart = content.substring(0, markers.start);
        const endContentPart = content.substring(markers.end);

        return `${ startContentPart }\n${ newContent }\n${ endContentPart }`;
    }

    /**
     * Updates the content of the README.md file in the root of the user's repository.
     *
     * @param {string} content The new content of the README.md file.
     * @param {string} [path] Path to the README.md file. If not provided, it will try to find the README.md file in the root of the user's repository.
     *
     * @throws {Error} If the file cannot be written.
     */
    public static updateReadme(content: string, path?: string): void {
        try {
            const readmePath = path || `${ process.cwd() }/../README.md`;
            FileSystemAdapter.writeFile(readmePath, content);
        }
        catch (error) {
            throw error;
        }
    }
}