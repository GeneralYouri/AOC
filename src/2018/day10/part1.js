const visualize = (points) => {
    const rows = Array.from(new Array(500)).map(() => Array.from(new Array(500)).fill('.'));
    points.forEach(([[x, y]]) => {
        rows[y][x] = '#';
    });

    return rows.slice(192, 204).map(row => row.slice(186, 250).join('')).join('\n');
};

module.exports = (input) => {
    let points = input.split(/\n/g).map((line) => {
        const [x, y, dx, dy] = /position=<(.+?),\s(.+?)> velocity=<(.+?),\s(.+?)>/g.exec(line).slice(1, 5).map(Number);
        return [[x, y], [dx, dy]];
    });

    for (let s = 0; s < 10710; s += 1) {
        points = points.map(([[x, y], [dx, dy]]) => {
            return ([[x + dx, y + dy], [dx, dy]]);
        });
    }

    return '\n' + visualize(points);
};
