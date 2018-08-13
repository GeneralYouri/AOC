const process = require('./process');

module.exports = (input) => {
    const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number));

    const gen = process(scanners);
    const [, , severity] = gen.next().value;

    return severity;
};
