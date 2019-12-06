module.exports = (input) => {
    const orbits = new Map(input.split(/\n/g).map(line => line.split(/\)/).reverse()));
    return Array.from(orbits.keys()).reduce((checksum, orbiter) => {
        while (orbits.has(orbiter)) {
            checksum += 1;
            orbiter = orbits.get(orbiter);
        }
        return checksum;
    }, 0);
};
