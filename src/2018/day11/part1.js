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

    for (let y = 1; y <= 298; y += 1) {
        for (let x = 1; x <= 298; x += 1) {
            let powerSum = 0;
            for (let dx = 0; dx < 3; dx += 1) {
                for (let dy = 0; dy < 3; dy += 1) {
                    powerSum += grid[y + dy][x + dx];
                }
            }
            if (powerSum > bestSum) {
                bestSum = powerSum;
                bestCoord = x + ',' + y;
            }
        }
    }

    return bestCoord;
};
