module.exports = (input) => {
    let index = 0;

    let groups = 0;
    let depth = 0;
    let garbage = false;

    while (index < input.length) {
        const char = input[index];

        if (garbage) {
            if (char === '!') {
                index += 1;
            } else if (char === '>') {
                garbage = false;
            }
        } else if (!garbage) {
            if (char === '{') {
                depth += 1;
                groups += depth;
            } else if (char === '}') {
                depth -= 1;
            } else if (char === '<') {
                garbage = true;
            }
        }

        index += 1;
    }

    return groups;
};
