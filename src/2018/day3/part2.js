const hasOverlap = (fabric, [, x, y, w, h]) => {
    for (let i = x; i < x + w; i += 1) {
        for (let j = y; j < y + h; j += 1) {
            if (fabric[i][j] > 1) {
                return true;
            }
        }
    }
    return false;
};

const size = 1000;
module.exports = (input) => {
    const claims = input.split(/\n/g).map(line => line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).slice(1).map(Number));

    const fabric = Array.from(Array(size)).map(() => Array(size).fill(0));
    claims.forEach(([, x, y, w, h]) => {
        for (let i = x; i < x + w; i += 1) {
            for (let j = y; j < y + h; j += 1) {
                fabric[i][j] += 1;
            }
        }
    });

    for (let c = 0; c < claims.length; c += 1) {
        if (!hasOverlap(fabric, claims[c])) {
            return claims[c][0];
        }
    }
    return undefined;
};
