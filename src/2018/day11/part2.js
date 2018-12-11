module.exports = (input) => {
    const serial = Number(input);

    const grid = Array.from(new Array(301)).map(() => []);
    for (let y = 1; y <= 300; y += 1) {
        for (let x = 1; x <= 300; x += 1) {
            const rackID = x + 10;
            const power = (rackID * y + serial) * rackID;
            const hundreds = Math.floor((power % 1000) / 100);
            grid[y][x] = hundreds - 5;
        }
    }

    let bestCoord = '';
    let bestSum = 0;

    for (let y = 1; y <= 300; y += 1) {
        for (let x = 1; x <= 300; x += 1) {
            const maxSize = Math.min(301 - x, 301 - y);
            let powerSum = 0;
            for (let s = 0; s < maxSize; s += 1) {
                for (let dx = 0; dx < s; dx += 1) {
                    powerSum += grid[y + s][x + dx];
                }
                for (let dy = 0; dy < s; dy += 1) {
                    powerSum += grid[y + dy][x + s];
                }
                powerSum += grid[y + s][x + s];
                if (powerSum > bestSum) {
                    bestSum = powerSum;
                    bestCoord = x + ',' + y + ',' + (s + 1);
                }
            }
        }
    }

    return bestCoord;
};
