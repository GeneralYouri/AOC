const { defInput } = require('./input.js');

function Coord(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Coord.prototype.add = function add(coord) {
    this.x += coord.x;
    this.y += coord.y;
    this.z += coord.z;
};
Coord.prototype.manhattan = function manhattan() {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
};
Coord.prototype.toString = function toString() {
    return `${this.x},${this.y},${this.z}`;
};

function Particle(id, position, velocity, acceleration) {
    this.id = id;
    this.position = new Coord(...position);
    this.velocity = new Coord(...velocity);
    this.acceleration = new Coord(...acceleration);
}

Particle.prototype.tick = function tick() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

function parts(input) {
    const particles = input.map((line, index) => new Particle(index, ...line.match(/<.*?>/g).map(coord => coord.slice(1, -1).split(',').map(Number))));
    console.log(particles[0]);

    // Part 1
    let closestParticle = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    particles.forEach((particle) => {
        const distance = particle.acceleration.manhattan();
        if (distance < closestDistance) {
            closestParticle = particle;
            closestDistance = distance;
        }
    });

    // Part 2
    let particleCount = particles.length;
    // Still not sure how to determine 'when all collisions are resolved' (my puzzle input required 39), so just iterating a ton of times instead
    for (let i = 0; i < 1000; i += 1) {
        const perPosition = {};
        particles.forEach((particle) => {
            particle.tick();
            const pos = particle.position.toString();
            if (!(pos in perPosition)) {
                perPosition[pos] = [];
            }
            perPosition[pos].push(particle);
        });

        Object.values(perPosition).forEach((items) => {
            if (items.length > 1) {
                particleCount -= items.length;
            }
        });
    }

    return { part1: closestParticle.id, part2: particleCount };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
