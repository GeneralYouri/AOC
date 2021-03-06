const tick = (p) => {
    for (let i = 0; i < 3; i += 1) {
        p[1][i] += p[2][i];
        p[0][i] += p[1][i];
    }
};

module.exports = (input) => {
    // Per particle: [position, velocity, acceleration]
    const particles = new Set(input.split(/\n/g).map(line => line.match(/<.*?>/g).map(coord => coord.slice(1, -1).split(',').map(Number))));

    // Still not sure how to determine 'when all collisions are resolved' (my puzzle input required 39), so just iterating a good amount instead
    for (let t = 0; t < 100; t += 1) {
        const byPosition = {};
        particles.forEach((particle) => {
            tick(particle);
            const pos = particle[0].toString(); // position
            if (!(pos in byPosition)) {
                byPosition[pos] = [];
            }
            byPosition[pos].push(particle);
        });

        Object.values(byPosition).forEach((items) => {
            if (items.length > 1) {
                items.forEach(item => particles.delete(item));
            }
        });
    }

    return particles.size;
};
