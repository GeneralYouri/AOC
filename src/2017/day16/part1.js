const Dance = require('./dance');

module.exports = (input, programCount = 16) => {
    const moves = input.split(/,/g).map(value => [value[0], value.match(/^\w([a-z0-9]{1,2})(?:\/([a-z0-9]{1,2}))?$/).slice(1)]);

    const dance = new Dance(programCount, moves);
    return dance.perform();
};
