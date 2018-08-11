const process = require('./process');

module.exports = (input) => {
    const offsets = input.split(/\n/g).map(Number);

    return process(offsets, offset => (offset >= 3 ? -1 : 1));
};
