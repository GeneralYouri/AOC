module.exports = (input) => {
    const square = Number(input);

    const index = Math.ceil((Math.sqrt(square) + 1) / 2) - 1;
    const edge = index * 2 + 1;

    const part1 = index - (index + ((square - edge * edge) % Math.max(edge - 1, 1)));


    const maxSize = Math.trunc(Math.log10(square) / 2 + 4);
    const grid = Array.from(Array(2 * maxSize)).map(() => Array(2 * maxSize).fill(0));
    let x = maxSize;
    let y = maxSize;
    grid[x][y] = 1;

    let temp;
    let dx = 1;
    let dy = 0;

    let part2 = 0;
    while (part2 <= square) {
        part2 += grid[x][y];
        x += dx;
        y += dy;

        // Add and subtract values from relevant positions only
        for (let i = -1; i <= 1; i += 1) {
            part2 += grid[x + dx + dy * i][y + dy + dx * i] - grid[x - dx - dx + dy * i][y - dy - dy + dx * i];
        }

        grid[x][y] = part2;

        // Adjust position deltas when a corner is detected
        if (grid[x + dy][y - dx] === 0) {
            temp = dx;
            dx = dy;
            dy = -temp;
        }
    }

    return [part1, part2];
};
