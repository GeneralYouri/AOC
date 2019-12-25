// TODO: This solution is old and slow

const getHash = node => 100 * node.pos.y + node.pos.x;

const getNeighbours = (grid, node) => {
    const x = node.pos.x;
    const y = node.pos.y;
    return [
        grid[y][x - 1],
        grid[y + 1] && grid[y + 1][x],
        grid[y][x + 1],
        grid[y - 1] && grid[y - 1][x],
    ].filter(n => n !== undefined && n.char !== '#');
};

module.exports = (input) => {
    let startNode;
    const keys = [];
    const grid = input.split(/\n/g).map((line, gy) => {
        return line.split('').map((field, gx) => {
            const charCode = field.charCodeAt(0);
            const node = {
                char: field,
                code: charCode,
                pos: { x: gx, y: gy },
                quad: -1,
                qDist: 0,
                doors: 0b0,
                keys: 0b0,
                keyBit: 0,
                splits: [],
            };

            if (field === '@') {
                startNode = node;
            } else if (charCode >= 65 && charCode <= 90) {
                node.keyBit = 1 << (charCode - 65);
            } else if (charCode >= 97 && charCode <= 122) {
                keys[charCode - 97] = node;
                node.keyBit = 1 << (charCode - 97);
            }
            return node;
        });
    });

    const quadrants = [[], [], [], []];
    for (const key of keys) {
        if (key.pos.y < startNode.pos.y) {
            if (key.pos.x < startNode.pos.x) {
                quadrants[0].push(key);
            } else {
                quadrants[1].push(key);
            }
        } else {
            if (key.pos.x < startNode.pos.x) {
                quadrants[2].push(key);
            } else {
                quadrants[3].push(key);
            }
        }
    }

    const findKeys = (qKeys, baseNode, baseDX, baseDY, quad) => {
        const candidates = [];
        const visited = {};
        visited[getHash(baseNode)] = true;
        baseNode.qDist = 0;
        baseNode.doors = 0b0;
        baseNode.quad = quad;
        baseNode.splits = [baseNode];
        const baseN1 = grid[baseNode.pos.y + baseDY][baseNode.pos.x];
        if (baseN1.code === 46) {
            candidates.push(baseN1);
            baseN1.qDist = 1;
            baseN1.doors = 0b0;
            baseN1.quad = quad;
            baseN1.splits = [baseNode];
        }
        const baseN2 = grid[baseNode.pos.y][baseNode.pos.x + baseDX];
        if (baseN2.code === 46) {
            candidates.push(baseN2);
            baseN2.qDist = 1;
            baseN2.doors = 0b0;
            baseN2.quad = quad;
            baseN2.splits = [baseNode];
        }
        while (candidates.length > 0) {
            const c = candidates.shift();

            for (const n of getNeighbours(grid, c)) {
                if (!visited[getHash(n)]) {
                    visited[getHash(n)] = true;
                    candidates.push(n);
                    n.qDist = c.qDist + 1;
                    n.quad = c.quad;
                    n.doors = c.doors;
                    n.keys = c.keys;
                    if (n.code >= 65 && n.code <= 90) {
                        n.doors |= n.keyBit;
                    } else if (n.code >= 97 && n.code <= 122) {
                        n.keys |= n.keyBit;
                    }
                    if (getNeighbours(grid, n).length > 2) {
                        n.splits = [n, ...c.splits];
                    } else {
                        n.splits = c.splits;
                    }
                }
            }
        }
    };

    findKeys(quadrants[0], grid[startNode.pos.y - 1][startNode.pos.x - 1], -1, -1, 0);
    findKeys(quadrants[1], grid[startNode.pos.y - 1][startNode.pos.x + 1], 1, -1, 1);
    findKeys(quadrants[2], grid[startNode.pos.y + 1][startNode.pos.x - 1], -1, 1, 2);
    findKeys(quadrants[3], grid[startNode.pos.y + 1][startNode.pos.x + 1], 1, 1, 3);

    const best = {};
    const bestLength = Array.from(Array(keys.length)).map(() => Number.POSITIVE_INFINITY);
    const recurse = (lastNodes, pathLength, keyMask, path, firstKey) => {
        const keyOptions = [];
        for (let i = 0; i < keys.length; i += 1) {
            if ((keyMask & keys[i].keyBit) === 0 && keyMask >= keys[i].doors) {
                let reachable = true;
                for (let j = 0; j < keys.length; j += 1) {
                    if ((keys[i].doors & keys[j].keyBit) !== 0 && (keyMask & keys[j].keyBit) === 0) {
                        reachable = false;
                    }
                }
                if (reachable) {
                    keyOptions.push(keys[i]);
                }
            }
        }

        if (keyOptions.length > 0) {
            for (const newKey of keyOptions) {
                const lastKey = lastNodes[newKey.quad];
                const newNodes = [...lastNodes];
                newNodes[newKey.quad] = newKey;
                // console.log(lastNodes.map(n => n.pos));

                let newLength = pathLength;
                if ((newKey.keys & lastKey.keyBit) !== 0) {
                    newLength += newKey.qDist - lastKey.qDist;
                } else {
                    const splitNode = newKey.splits.find(node => lastKey.splits.includes(node));
                    newLength += lastKey.qDist + newKey.qDist - 2 * splitNode.qDist;
                }

                const newKeyMask = keyMask | newKey.keyBit;
                const hash1 = newNodes.reduce((sum, node, i) => sum + 1e4 ** i * (100 * node.pos.y + node.pos.x), 0);
                const hash2 = newKeyMask;
                if (!best[hash1]) {
                    best[hash1] = {};
                }
                if (!best[hash1][hash2] || newLength < best[hash1][hash2]) {
                    best[hash1][hash2] = newLength;
                    const newPath = path + newKey.char;
                    recurse(newNodes, newLength, newKeyMask, newPath, firstKey);
                }
            }
        } else if (keyMask === ((1 << 26) - 1)) {
            if (pathLength < bestLength[firstKey.code - 97]) {
                bestLength[firstKey.code - 97] = pathLength;
                // console.log(pathLength, path);
            }
        }
    };

    for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].doors === 0) {
            const lastNodes = [
                grid[startNode.pos.y - 1][startNode.pos.x - 1],
                grid[startNode.pos.y - 1][startNode.pos.x + 1],
                grid[startNode.pos.y + 1][startNode.pos.x - 1],
                grid[startNode.pos.y + 1][startNode.pos.x + 1],
            ];
            lastNodes[keys[i].quad] = keys[i];
            recurse(lastNodes, keys[i].qDist, keys[i].keyBit, keys[i].char, keys[i]);
        }
    }
    return Math.min(...bestLength);
};
