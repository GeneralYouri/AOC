module.exports = (input, garbageCollector = () => {}) => {
    let index = 0;

    let depth = 0;
    let groupCount = 0;
    let garbage = false;
    let garbageCount = 0;

    while (index < input.length) {
        const char = input[index];

        if (garbage) {
            if (char === '!') {
                index += 1;
            } else if (char === '>') {
                garbage = false;
                garbageCollector(garbageCount);
                garbageCount = 0;
            } else {
                garbageCount += 1;
            }
        } else if (!garbage) {
            if (char === '{') {
                depth += 1;
                groupCount += depth;
            } else if (char === '}') {
                depth -= 1;
            } else if (char === '<') {
                garbage = true;
            }
        }

        index += 1;
    }

    return groupCount;
};
