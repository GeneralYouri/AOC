const getChain = (orbits, orbiter) => {
    const chain = [];
    while (orbits.has(orbiter)) {
        orbiter = orbits.get(orbiter);
        chain.push(orbiter);
    }
    return chain;
};

const doPart1 = (orbits) => {
    let neighbours = ['COM'];
    let newNeighbours = [];
    let length = 0;
    let checksum = 0;
    while (neighbours.length > 0) {
        while (neighbours.length > 0) {
            const target = neighbours.pop();
            checksum += length;
            if (target in orbits) {
                newNeighbours.push(...orbits[target]);
            }
        }
        length += 1;
        neighbours = newNeighbours;
        newNeighbours = [];
    }
    return checksum;
};

const doPart2 = (orbits) => {
    const youChain = getChain(orbits, 'YOU');
    const sanChain = getChain(orbits, 'SAN');
    let rootLength = 0;
    let youIndex = youChain.length - 1;
    let sanIndex = sanChain.length - 1;
    while (youChain[youIndex] === sanChain[sanIndex]) {
        rootLength += 1;
        youIndex -= 1;
        sanIndex -= 1;
    }
    return youChain.length + sanChain.length - 2 * rootLength;
};

module.exports = (input) => {
    const orbits1 = {};
    const orbits2 = new Map();
    input.split(/\n/g).forEach((line) => {
        const orbitee = line.slice(0, 3);
        const orbiter = line.slice(4);
        if (orbits1[orbitee]) {
            orbits1[orbitee].push(orbiter);
        } else {
            orbits1[orbitee] = [orbiter];
        }
        orbits2.set(orbiter, orbitee);
    });

    const part1 = doPart1(orbits1);
    const part2 = doPart2(orbits2);
    return [part1, part2];
};
