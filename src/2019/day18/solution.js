/*
Assumptions:
- The grid is square-shaped
- The starting location is the grid center
- The grid is divided into 4 quadrants which only meet in a 3x3 square around the center
- All quadrants are surrounded by a solid wall, except for the center square
- There are no loops or alternative paths to reach the same place
- All keys are reachable in exactly one way from the starting location
- No key is locked behind their own door
- There is at least one solution, ie one path which unlocks required doors in such an order that all keys are obtainable
 */

const getLeft = ({ x, y, dx, dy }) => ({ x: x + dy, y: y - dx, dx: dy, dy: -dx });
const getStraight = ({ x, y, dx, dy }) => ({ x: x + dx, y: y + dy, dx, dy });
const getRight = ({ x, y, dx, dy }) => ({ x: x - dy, y: y + dx, dx: -dy, dy: dx });
const getNeighbours = pos => [getLeft(pos), getStraight(pos), getRight(pos)];

const switchQuad = [
    [0, 2, 2, 4],
    [2, 0, 4, 2],
    [2, 4, 0, 2],
    [4, 2, 2, 0],
];

// 4406 sdvnmpuagfiehwjqotkyrcbxzl
const doPart1 = (input) => {
    const size = Math.trunc(Math.sqrt(input.length + 1));
    const to1d = ({ x, y }) => (size + 1) * y + x;

    const keys = Array.from(Array(26)).map((_, id) => ({
        id,
        bit: 1 << id,
        quad: 0,
        dist: 0,
        doors: 0b0,
        splits: [],
    }));

    const center = { x: (size - 1) / 2, y: (size - 1) / 2 };
    const quadBases = [
        [{ x: center.x - 1, y: center.y - 1, dx: -1, dy: -1 }, 0],
        [{ x: center.x + 1, y: center.y - 1, dx: 1, dy: -1 }, 1],
        [{ x: center.x - 1, y: center.y + 1, dx: -1, dy: 1 }, 2],
        [{ x: center.x + 1, y: center.y + 1, dx: 1, dy: 1 }, 3],
    ];

    for (const [base, quad] of quadBases) {
        const candidates = [];

        const nx = {
            x: base.x + base.dx,
            y: base.y,
            dx: base.dx,
            dy: 0,
            dist: 1,
            doors: 0b0,
            splits: [],
        };
        if (input[to1d(nx)] === '.') {
            candidates.push(nx);
        }

        const ny = {
            x: base.x,
            y: base.y + base.dy,
            dx: 0,
            dy: base.dy,
            dist: 1,
            doors: 0b0,
            splits: [],
        };
        if (input[to1d(ny)] === '.') {
            candidates.push(ny);
        }

        while (candidates.length > 0) {
            const candidate = candidates.pop();
            const neighbours = getNeighbours(candidate).filter(n => input.charCodeAt(to1d(n)) !== 35);
            if (neighbours.length > 1) {
                candidate.splits.push((to1d(candidate) << 16) + candidate.dist);
            }

            for (const next of neighbours) {
                const code = input.charCodeAt(to1d(next));
                if (code === 35) {
                    continue;
                }

                next.dist = candidate.dist + 1;
                if (code >= 65 && code <= 90) {
                    next.doors = candidate.doors | (1 << (code - 65));
                } else {
                    next.doors = candidate.doors;
                }
                next.splits = candidate.splits.slice();

                if (code >= 97 && code <= 122) {
                    next.splits.push((to1d(next) << 16) + next.dist);
                    const key = keys[code - 97];
                    key.quad = quad;
                    key.dist = next.dist;
                    key.doors = next.doors;
                    key.splits = next.splits;
                }

                candidates.push(next);
            }
        }
    }

    const keysDist = Array.from(Array(keys.length)).map(() => Array(keys.length).fill(Number.POSITIVE_INFINITY));
    for (let id1 = 0; id1 < keys.length; id1 += 1) {
        for (let id2 = id1 + 1; id2 < keys.length; id2 += 1) {
            const key1 = keys[id1];
            const key2 = keys[id2];

            let dist = 0;
            if (key1.quad === key2.quad) {
                const splitDist = 0xffff & key1.splits.find((v, j) => key1.splits[j + 1] !== key2.splits[j + 1]);
                dist = key1.dist + key2.dist - 2 * splitDist;
            } else {
                dist = key1.dist + key2.dist + switchQuad[key1.quad][key2.quad];
            }
            keysDist[id1][id2] = dist;
            keysDist[id2][id1] = dist;
        }
    }

    // DP BFS setup
    let bests = new Map();
    for (const key of keys) {
        if (key.doors === 0) {
            const hash = (key.id << 26) + key.bit;
            bests.set(hash, 2 + key.dist);
        }
    }

    // DP BFS
    for (let round = 1; round < 26; round += 1) {
        const newBests = new Map();
        bests.forEach((dist, hash) => {
            const keysMask = hash & 0x3ffffff;
            const lastKey = (hash - keysMask) / (1 << 26);

            for (const newKey of keys) {
                if ((keysMask & newKey.bit) + (~keysMask & newKey.doors) === 0) {
                    const newLastKey = newKey.id;
                    const newDist = dist + keysDist[lastKey][newLastKey];
                    const newHash = (newLastKey << 26) + (keysMask | newKey.bit);

                    const oldBest = newBests.get(newHash);
                    if (!oldBest || newDist < oldBest) {
                        newBests.set(newHash, newDist);
                    }
                }
            }
        });
        bests = newBests;
    }
    return Math.min(...Array.from(bests).map(b => b[1]));
};

const doPart2 = (input) => {
    const size = Math.trunc(Math.sqrt(input.length + 1));
    const to1d = ({ x, y }) => (size + 1) * y + x;

    const keys = Array.from(Array(26)).map((_, id) => ({
        id,
        bit: 1 << id,
        quad: 0,
        dist: 0,
        doors: 0b0,
        splits: [],
    }));

    const center = { x: (size - 1) / 2, y: (size - 1) / 2 };
    const quadBases = [
        [{ x: center.x - 1, y: center.y - 1, dx: -1, dy: -1 }, 0],
        [{ x: center.x + 1, y: center.y - 1, dx: 1, dy: -1 }, 1],
        [{ x: center.x - 1, y: center.y + 1, dx: -1, dy: 1 }, 2],
        [{ x: center.x + 1, y: center.y + 1, dx: 1, dy: 1 }, 3],
    ];

    for (const [base, quad] of quadBases) {
        const candidates = [];

        const nx = {
            x: base.x + base.dx,
            y: base.y,
            dx: base.dx,
            dy: 0,
            dist: 1,
            doors: 0b0,
            splits: [],
        };
        if (input[to1d(nx)] === '.') {
            candidates.push(nx);
        }

        const ny = {
            x: base.x,
            y: base.y + base.dy,
            dx: 0,
            dy: base.dy,
            dist: 1,
            doors: 0b0,
            splits: [],
        };
        if (input[to1d(ny)] === '.') {
            candidates.push(ny);
        }

        while (candidates.length > 0) {
            const candidate = candidates.pop();
            const neighbours = getNeighbours(candidate).filter(n => input.charCodeAt(to1d(n)) !== 35);
            if (neighbours.length > 1) {
                candidate.splits.push((to1d(candidate) << 16) + candidate.dist);
            }

            for (const next of neighbours) {
                const code = input.charCodeAt(to1d(next));
                if (code === 35) {
                    continue;
                }

                next.dist = candidate.dist + 1;
                if (code >= 65 && code <= 90) {
                    next.doors = candidate.doors | (1 << (code - 65));
                } else {
                    next.doors = candidate.doors;
                }
                next.splits = candidate.splits.slice();

                if (code >= 97 && code <= 122) {
                    next.splits.push((to1d(next) << 16) + next.dist);
                    const key = keys[code - 97];
                    key.quad = quad;
                    key.dist = next.dist;
                    key.doors = next.doors;
                    key.splits = next.splits;
                }

                candidates.push(next);
            }
        }
    }

    const keysDist = Array.from(Array(keys.length)).map(() => Array(keys.length).fill(Number.POSITIVE_INFINITY));
    for (let id1 = 0; id1 < keys.length; id1 += 1) {
        for (let id2 = id1 + 1; id2 < keys.length; id2 += 1) {
            const key1 = keys[id1];
            const key2 = keys[id2];
            if (key1.quad !== key2.quad) {
                continue;
            }

            const splitDist = 0xffff & key1.splits.find((v, j) => key1.splits[j + 1] !== key2.splits[j + 1]);
            const dist = key1.dist + key2.dist - 2 * splitDist;
            keysDist[id1][id2] = dist;
            keysDist[id2][id1] = dist;
        }
    }

    // DP BFS setup
    let bests = new Map();
    bests.set(((26 << 18) + (26 << 12) + (26 << 6) + 26) * (2 ** 26), 0);

    // DP BFS
    for (let round = 0; round < 26; round += 1) {
        const newBests = new Map();
        bests.forEach((dist, hash) => {
            const keysMask = hash & 0x3ffffff;
            const lastKeysHash = (hash - keysMask) / (1 << 26);

            for (const newKey of keys) {
                if ((keysMask & newKey.bit) + (~keysMask & newKey.doors) === 0) {
                    const lastKeyIndex = 6 * newKey.quad;
                    const lastKey = (lastKeysHash >> lastKeyIndex) & 0x3f;

                    const newLastKey = newKey.id;
                    const newDist = dist + ((lastKey === 26) ? newKey.dist : keysDist[lastKey][newLastKey]);
                    const newLastKeysHash = lastKeysHash + (newLastKey << lastKeyIndex) - (lastKey << lastKeyIndex);
                    const newHash = (newLastKeysHash * 2 ** 26) + (keysMask | newKey.bit);

                    const oldBest = newBests.get(newHash);
                    if (!oldBest || newDist < oldBest) {
                        newBests.set(newHash, newDist);
                    }
                }
            }
        });
        bests = newBests;
    }
    return Math.min(...Array.from(bests).map(b => b[1]));
};

module.exports = (input) => {
    const part1 = doPart1(input);
    const part2 = doPart2(input);
    return [part1, part2];
};
