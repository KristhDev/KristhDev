const fs = require('fs');
const path = require('path');

const { constants } = require('../utils');

const loadReadme = () => {
    console.log('Load content of README.md');

    const readmePath = path.join(__dirname, '../../../README.md');
    const readmeContent = fs.readFileSync(readmePath, { encoding: constants.ENCODING });

    return readmeContent;
}

module.exports = loadReadme;