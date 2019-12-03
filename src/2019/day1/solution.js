module.exports = (input) => {
    let part1 = 0;
    let part2 = 0;
    for (let mass of input.split(/\n/g)) {
        mass = Math.trunc(mass / 3) - 2;
        part1 += mass;
        do {
            part2 += mass;
            mass = Math.trunc(mass / 3) - 2;
        } while (mass > 0);
    }
    return [part1, part2];
};
