module.exports = (input) => {
    const sheet = input.split(/\n/g);
    let part1 = 0;
    let part2 = 0;
    for (let i = 0; i < sheet.length; i += 1) {
        const row = sheet[i].split(/\t/).map(Number);

        let lowest = Number.MAX_SAFE_INTEGER;
        let highest = 0;
        for (let j = 0; j < row.length; j += 1) {
            const cell = row[j];
            if (cell < lowest) {
                lowest = cell;
            }
            if (cell > highest) {
                highest = cell;
            }

            for (let k = j + 1; k < row.length; k += 1) {
                const div = cell > row[k] ? cell / row[k] : row[k] / cell;
                if (div === (0 | div)) {
                    part2 += div;
                    break;
                }
            }
        }
        part1 += highest - lowest;
    }
    return [part1, part2];
};
