/* Env */
import { env } from '@config/env';

/* Entities */
import { ProjectEntity, SkillEntity } from '@domain/entities';

/* Contracts */
import { MarkdownServiceContract, ReadmeServiceContract } from '@domain/contracts/services';

/* Interfaces */
import { UpdateMarkdownSectionOptions } from '../interfaces';

export class ReadmeService implements ReadmeServiceContract {
    constructor(
        private readonly markdownService: MarkdownServiceContract
    ) {}

    /**
     * Generates a sub-section of the skills section in the README.md file.
     *
     * @param {SkillEntity[]} skills List of skills.
     * @param {string} sectionName Name of the section.
     * @return {string} The sub-section of the skills section in Markdown format.
     */
    private generateSkillsItemList(skills: SkillEntity[], sectionName: string): string {
        let template = '\n';
        template += `- ### ${ sectionName } \n\n`;
        template += `<div> \n \n`;

        skills.forEach(skill => {
            template += `  ![${ skill.name }](${ skill.badge }) \n`;
        });

        template += ` \n`;
        template += `</div> \n`;

        return template;
    }

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
        let template = '\n';
        template += '<div align="center"> \n';
        template += `  <h1 align="center">Hola, soy <a href="${ env.PORTFOLIO_URL }">Kristhian Ferrufino 👋🏻</a></h1> \n`;
        template += '  <br/> \n\n';
        template += '  <a target="_blank"> \n';
        template += `    <img alt="Github banner Kristhian Ferrufino" width="100%" src="${ env.PORTFOLIO_BANNER_URL }"> \n`;
        template += '  </a> \n';
        template += '</div> \n';

        return template;
    }

    /**
     * Generates the social media section in the README.md file.
     *
     * This section is the second section of the README.md file and contains a
     * heading with the name of the user and a link to the user's portfolio.
     *
     * @return {string} The social media section in Markdown format.
     */
    public generateSocialMediaSection(): string {
        const socialMedia = [
            {
                name: 'Facebook',
                url: 'https://www.facebook.com/kristhian.ferrufino',
                badge: 'https://img.shields.io/badge/Facebook-0866FF?style=for-the-badge&logo=facebook&logoColor=white'
            },
            {
                name: 'Instagram',
                url: 'https://www.instagram.com/kristhdev',
                badge: 'https://img.shields.io/badge/Instagram-FF0069?style=for-the-badge&logo=instagram&logoColor=white'
            },
            {
                name: 'Threads',
                url: 'https://www.threads.com/@kristhdev',
                badge: 'https://img.shields.io/badge/Threads-000000?style=for-the-badge&logo=threads&logoColor=white'
            },
            {
                name: 'X (Twitter)',
                url: 'https://twitter.com/kristh_ferr_dev',
                badge: 'https://img.shields.io/badge/X_(Twitter)-000000?style=for-the-badge&logo=x&logoColor=white'
            },
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/kristhian-ferrufino-528bb4235',
                badge: 'https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgZmlsbD0iIzAwMDAwMCI+PGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiPjwvZz48ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvZz48ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+IDx0aXRsZT5saW5rZWRpbiBbI2ZmZmZmZl08L3RpdGxlPiA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gPGRlZnM+IDwvZGVmcz4gPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+IDxnIGlkPSJEcmliYmJsZS1MaWdodC1QcmV2aWV3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwLjAwMDAwMCwgLTc0NzkuMDAwMDAwKSIgZmlsbD0iI2ZmZmZmZiI+IDxnIGlkPSJpY29ucyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCAxNjAuMDAwMDAwKSI+IDxwYXRoIGQ9Ik0xNDQsNzMzOSBMMTQwLDczMzkgTDE0MCw3MzMyLjAwMSBDMTQwLDczMzAuMDgxIDEzOS4xNTMsNzMyOS4wMSAxMzcuNjM0LDczMjkuMDEgQzEzNS45ODEsNzMyOS4wMSAxMzUsNzMzMC4xMjYgMTM1LDczMzIuMDAxIEwxMzUsNzMzOSBMMTMxLDczMzkgTDEzMSw3MzI2IEwxMzUsNzMyNiBMMTM1LDczMjcuNDYyIEMxMzUsNzMyNy40NjIgMTM2LjI1NSw3MzI1LjI2IDEzOS4wODMsNzMyNS4yNiBDMTQxLjkxMiw3MzI1LjI2IDE0NCw3MzI2Ljk4NiAxNDQsNzMzMC41NTggTDE0NCw3MzM5IEwxNDQsNzMzOSBaIE0xMjYuNDQyLDczMjMuOTIxIEMxMjUuMDkzLDczMjMuOTIxIDEyNCw3MzIyLjgxOSAxMjQsNzMyMS40NiBDMTI0LDczMjAuMTAyIDEyNS4wOTMsNzMxOSAxMjYuNDQyLDczMTkgQzEyNy43OSw3MzE5IDEyOC44ODMsNzMyMC4xMDIgMTI4Ljg4Myw3MzIxLjQ2IEMxMjguODg0LDczMjIuODE5IDEyNy43OSw3MzIzLjkyMSAxMjYuNDQyLDczMjMuOTIxIEwxMjYuNDQyLDczMjMuOTIxIFogTTEyNCw3MzM5IEwxMjksNzMzOSBMMTI5LDczMjYgTDEyNCw3MzI2IEwxMjQsNzMzOSBaIiBpZD0ibGlua2VkaW4tWyNmZmZmZmZdIj4gPC9wYXRoPiA8L2c+IDwvZz4gPC9nPiA8L2c+PC9zdmc+'
            },
            {
                name: 'Gmail',
                url: 'mailto:kristhdev@gmail.com',
                badge: 'https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white'
            }
        ];


        let template = '\n';
        template += '<div align="center"> \n\n';

        socialMedia.forEach(media => {
            template += `  [![${ media.name }](${ media.badge })](${ media.url })\n`;
        });

        template += '\n';
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
            const projectDescription = project.description.length > 250 
                ? project.description.substring(0, 250) + '...' 
                : project.description;

            let template = '  <tr border="none"> \n';
            template += '    <td align="center"> \n';

            template += `      <img align="left" alt="${ project.name }" src="${ project.image }" width="50%"> \n`;
            template += '      <div align="right"> \n';
            template += `        <h3 align="center">${ project.name }</h3> \n`;
            template += '        <p align="left"> \n';
            template += `          ${ projectDescription } \n`;
            template += '        </p> \n';

            template += '        <div> \n\n';

            const projectUrl = new URL(env.PORTFOLIO_URL);
            projectUrl.pathname = `/projects/${ project.slug }`;

            const readAlt = `${ project.name } Artículo`;
            const readBadge = 'https://img.shields.io/badge/Leer-brightgreen.svg?logo=readme&label=|&logoColor=FFFFFF';

            const repositoryAlt = `${ project.name } Repositorio`;
            const repositoryBadge = 'https://img.shields.io/badge/Repo-brightgreen.svg?logo=github&label=|';

            const seeAlt = `${ project.name } Url`;
            const seeBadge = 'https://img.shields.io/badge/Ver-brightgreen.svg?logo=realm&label=|';

            template += `[![${ readAlt } ](${ readBadge })](${ projectUrl.toString() })\n`;

            if (project.repositories && project.repositories.length > 0) {
                template += `[![${ repositoryAlt } ](${ repositoryBadge })](${ project.repositories[0] })\n`;
            }

            if (project.url) {
                template += `[![${ seeAlt } ](${ seeBadge })](${ project.url })\n`;
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
     * Generates the skills section in the README.md file.
     *
     * This section is the last section of the README.md file and contains a
     * table with the latest projects.
     *
     * @return {string} The skills section in Markdown format.
     */
    public generateSkillsSection(skills: SkillEntity[]): string {
        const skillsMap = {
            languages: {
                sectionName: 'Lenguajes',
                skills: skills.filter(skill => skill.type === 'language')
            },
            frameworks: {
                sectionName: 'Frameworks',
                skills: skills.filter(skill => skill.type === 'framework')
            },
            databases: {
                sectionName: 'Bases de Datos',
                skills: skills.filter(skill => skill.type === 'database')
            },
            baas: {
                sectionName: 'BAAS',
                skills: skills.filter(skill => skill.type === 'baas')
            },
            tools: {
                sectionName: 'Herramientas',
                skills: skills.filter(skill => skill.type === 'tool')
            }
        };

        let template = '';

        Object.entries(skillsMap).forEach(([ _, item ]) => {
            template += this.generateSkillsItemList(item.skills, item.sectionName);
        });

        return template;
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