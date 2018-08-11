const process = require('./process');

module.exports = (input) => {
    const steps = input.split(/,/g);

    return process(steps);
};
