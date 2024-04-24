const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { getLastProjects, loadReadme } = require('../actions');
const { constants } = require('../utils');

const updateProjects = async () => {
    try {
        console.log('Updating projects');
        const projects = await getLastProjects();

        let projectsTable = '<table align="center"> \n';
        projectsTable += '  <tr border="none"> \n';
        projectsTable += projects.join('');
        projectsTable += '  </tr> \n';
        projectsTable += '</table>';

        const readmeContent = loadReadme();
        const startIndex = readmeContent.indexOf(constants.PROJECTS_START_MARKER);
        const endIndex = readmeContent.indexOf(constants.PROJECTS_END_MARKER);

        const hasStartMarker = startIndex !== -1;
        const hasEndMarker = endIndex !== -1;
        const areMarkersWellPositioned = 
            hasStartMarker && 
            hasEndMarker && 
            ((startIndex + constants.PROJECTS_START_MARKER.length) < endIndex);

        if (!hasStartMarker || !hasEndMarker || !areMarkersWellPositioned) {
            throw new Error('README markers of projects not found or are misconfigured.');
        }

        const updatedReadmeContent = readmeContent.substring(0, startIndex + constants.PROJECTS_START_MARKER.length) + `\n${ projectsTable }\n` + readmeContent.substring(endIndex);
        fs.writeFileSync(path.join(__dirname, '../../../README.md'), updatedReadmeContent);

        console.log('Projects updated successfully!');
    } 
    catch (error) {
        console.log('Error updating projects');
        console.log(error);
    }
}

updateProjects();