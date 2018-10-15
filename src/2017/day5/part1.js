const process = require('./process');

module.exports = (input) => {
    const offsets = input.split(/\n/g).map(Number);

    return process(offsets, Number.POSITIVE_INFINITY);
};
