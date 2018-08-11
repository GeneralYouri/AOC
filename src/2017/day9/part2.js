const process = require('./process');

module.exports = (input) => {
    let garbageCount = 0;
    process(input, (garbagePile) => {
        garbageCount += garbagePile;
    });
    return garbageCount;
};
