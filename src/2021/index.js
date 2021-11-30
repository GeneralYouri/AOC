const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const getDirectories = source => readdirSync(source).filter(name => lstatSync(join(source, name)).isDirectory());

module.exports = {};
const days = getDirectories(__dirname);
days.forEach((day) => {
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    module.exports[day] = require(join(__dirname, day));
});
