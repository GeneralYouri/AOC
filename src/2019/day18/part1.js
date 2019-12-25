const isWall = code => code === 35;
const isPath = code => code === 46;
const isDoor = code => code >= 65 && code <= 90;
const isKey = code => code >= 97 && code <= 122;

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

module.exports = (input) => {
    const size = Math.trunc(Math.sqrt(input.length + 1));
    const to1d = ({ x, y }) => (size + 1) * y + x;

    const keys = Array.from(Array(26)).map((_, id) => ({
        id,
        char: String.fromCharCode(id + 97),
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
                candidate.splits.push((1 << 16) * to1d(candidate) + candidate.dist);
            }

            for (const next of neighbours) {
                const code = input.charCodeAt(to1d(next));
                if (isWall(code)) {
                    continue;
                }

                next.dist = candidate.dist + 1;
                next.doors = candidate.doors | (isDoor(code) ? (1 << (code - 65)) : 0);
                next.splits = candidate.splits.slice();

                if (isKey(code)) {
                    next.splits.push((1 << 16) * to1d(next) + next.dist);
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
        keysDist[id1][id1] = 0;
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
    let best = {};
    for (const key of keys) {
        if (key.doors === 0) {
            const hash = (1 << 26) * key.id + key.bit;
            best[hash] = { keysMask: key.bit, lastKey: key.id, dist: 2 + key.dist };
        }
    }

    // DP BFS
    for (let round = 1; round < 26; round += 1) {
        const candidates = Object.values(best);
        const newBest = {};
        for (const { keysMask, lastKey, dist } of candidates) {
            for (const newKey of keys) {
                if ((keysMask & newKey.bit) + (~keysMask & newKey.doors) === 0) {
                    const newKeysMask = keysMask | newKey.bit;
                    const newLastKey = newKey.id;
                    const newDist = dist + keysDist[lastKey][newLastKey];

                    const hash = (1 << 26) * newLastKey + newKeysMask;
                    if (!(hash in newBest) || newDist < newBest[hash].dist) {
                        newBest[hash] = { keysMask: newKeysMask, lastKey: newLastKey, dist: newDist };
                    }
                }
            }
        }
        best = newBest;
    }
    return Math.min(...Object.values(best).map(c => c.dist));
};
