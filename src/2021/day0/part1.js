const lib = require('../library.js');

module.exports = (input) => {
    const lines = input.lines().map(line => line.match(/(.*)/).slice(1));
    for (const line of lines) {
        console.log(line);
    }
};
