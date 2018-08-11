module.exports = (input) => {
    let index = 0;

    let garbage = false;
    let garbageCount = 0;

    while (index < input.length) {
        const char = input[index];

        if (garbage) {
            if (char === '!') {
                index += 1;
            } else if (char === '>') {
                garbage = false;
            } else {
                garbageCount += 1;
            }
        } else if (!garbage) {
            if (char === '<') {
                garbage = true;
            }
        }

        index += 1;
    }

    return garbageCount;
};
