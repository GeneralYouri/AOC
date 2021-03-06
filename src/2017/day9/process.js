module.exports = (input, garbageCollector = () => {}) => {
    let groupCount = 0;
    let depth = 0;
    let garbage = false;
    let garbagePile = 0;

    for (let i = 0; i < input.length; i += 1) {
        const char = input[i];

        if (garbage) {
            if (char === '!') {
                i += 1;
            } else if (char === '>') {
                garbage = false;
                garbageCollector(garbagePile);
                garbagePile = 0;
            } else {
                garbagePile += 1;
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
    }

    return groupCount;
};
