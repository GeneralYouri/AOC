module.exports = (input) => {
    let part1 = 0;
    let part2 = 0;
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
                part2 += garbagePile;
                garbagePile = 0;
            } else {
                garbagePile += 1;
            }
        } else {
            if (char === '{') {
                depth += 1;
                part1 += depth;
            } else if (char === '}') {
                depth -= 1;
            } else if (char === '<') {
                garbage = true;
            }
        }
    }

    return [part1, part2];
};
