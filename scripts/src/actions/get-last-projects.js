const { fetchApi } = require('../api');

const getLastProjects = async () => {
    try {
        console.log('Getting last projects');
        const { projects } = await fetchApi('/projects/last');

        const projectsToMarkdown = projects.map(project => {

            let template = '    <td align="center" width="33%"> \n';

            template += `      <img alt="${ project.name }" src="${ project.image }" /> \n`;
            template += `      <h3 align="center">${ project.name }</h3> \n`;
            template += '      <p align="left">' + (project.description.length > 220 ? project.description.substring(0, 220) + '...' : project.description) + '</p> \n';

            template += '      <div> \n';

            template += `        <a href="${ process.env.PORTFOLIO_URL }/projects/${ project.slug }" target="_blank" rel="noopener noreferrer"> \n`;
            template += `          <img alt="${ project.name }" src="https://img.shields.io/badge/Leer-brightgreen.svg?logo=readme&label=|&logoColor=FFFFFF" /> \n`;
            template += '        </a> \n';

            if (project.url || (project.repositories && project.repositories.length > 0)) {
                if (project.repositories && project.repositories.length > 0) {
                    template += `        <a href="${ project.repositories[0] }" target="_blank" rel="noopener noreferrer"> \n`;
                    template += `          <img alt="${ project.name }" src="https://img.shields.io/badge/Repo-brightgreen.svg?logo=github&label=|" /> \n`;
                    template += '        </a> \n';
                }

                if (project.url) {
                    template += `        <a href="${ project.url }" target="_blank" rel="noopener noreferrer"> \n`;
                    template += `          <img alt="${ project.name }" src="https://img.shields.io/badge/Ver-brightgreen.svg?logo=realm&label=|" /> \n`;
                    template += '        </a> \n';
                }
            }

            template += '      </div> \n';
            template += '    </td> \n';

            return template;
        });

        console.log('Last projects getting successfully!');
        return projectsToMarkdown;
    } 
    catch (error) {
        console.log('Error getting last projects');
        throw new Error(error);
    }
}

module.exports = getLastProjects;