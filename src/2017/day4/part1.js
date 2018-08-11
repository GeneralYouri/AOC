const process = require('./process');

module.exports = (input) => {
    const phrases = input.split(/\n/g).map(row => row.split(/ /));

    return process(phrases, word => word);
};
