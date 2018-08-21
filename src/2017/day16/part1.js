const Dance = require('./dance');

module.exports = (input, programCount = 16) => {
    const moves = input.split(/,/g).map(value => [value[0], ...value.slice(1).split(/\//)]);

    const dance = new Dance(programCount, moves);
    return dance.perform();
};
