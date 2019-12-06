const getChain = (orbits, orbiter) => {
    const chain = [];
    while (orbits.has(orbiter)) {
        orbiter = orbits.get(orbiter);
        chain.push(orbiter);
    }
    return chain;
};

module.exports = (input) => {
    const orbits = new Map(input.split(/\n/g).map(line => line.split(/\)/).reverse()));
    const youChain = getChain(orbits, 'YOU');
    const sanChain = getChain(orbits, 'SAN');
    const youLength = youChain.findIndex(obj => sanChain.includes(obj));
    const sanLength = sanChain.findIndex(obj => youChain.includes(obj));
    return youLength + sanLength;
};
