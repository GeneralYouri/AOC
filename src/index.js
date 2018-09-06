const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const getDirectories = source => readdirSync(source).filter(name => lstatSync(join(source, name)).isDirectory());

module.exports = {};
const years = getDirectories(__dirname);
years.forEach((year) => {
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    module.exports[year] = require(join(__dirname, year));
});
