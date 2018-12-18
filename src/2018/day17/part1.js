module.exports = (input) => {
    const map = [];
    let lowY = Number.POSITIVE_INFINITY;
    let highY = 0;
    let lowX = Number.POSITIVE_INFINITY;
    let highX = 0;
    input.split(/\n/g).forEach((line) => {
        const [left, right] = line.split(', ');
        if (left[0] === 'x') {
            const x = Number(left.slice(2));
            const [y1, y2] = right.slice(2).split('..').map(Number);
            for (let y = y1; y <= y2; y += 1) {
                if (!map[y]) {
                    map[y] = [];
                }
                map[y][x] = '#';
            }
            if (y1 < lowY) {
                lowY = y1;
            }
            if (y2 > highY) {
                highY = y1;
            }
            if (x < lowX) {
                lowX = x;
            }
            if (x > highX) {
                highX = x;
            }
        } else {
            const y = Number(left.slice(2));
            const [x1, x2] = right.slice(2).split('..').map(Number);
            if (!map[y]) {
                map[y] = [];
            }
            for (let x = x1; x <= x2; x += 1) {
                map[y][x] = '#';
            }
            if (y < lowY) {
                lowY = y;
            }
            if (y > highY) {
                highY = y;
            }
            if (x1 < lowX) {
                lowX = x1;
            }
            if (x2 > highX) {
                highX = x1;
            }
        }
    });
    lowX -= 2;
    highX += 2;
    for (let y = lowY; y <= highY; y += 1) {
        for (let x = lowX; x <= highX; x += 1) {
            if (!map[y]) {
                map[y] = [];
            }
            if (!map[y][x]) {
                map[y][x] = '.';
            }
        }
    }

    const visualize = m => m.map(line => line.join('')).slice(lowY).join('\n');

    const flow = (fn, x, y) => {
        map[y][x] = '|';
        if (y >= highY) {
            return;
        }
        const below = map[y + 1][x];
        if (below === '.') {
            flow(fn, x, y + 1);
        } else if (below === '#' || below === '~') {
            fn(x, y);
        }
    };

    const fill = (x, y) => {
        const toFill = [[x, y]];
        let dx1 = -1;
        let left = map[y][x + dx1];
        let downleft = map[y + 1][x + dx1];
        while ((left === '.' || left === '|') && (downleft === '#' || downleft === '~')) {
            toFill.push([x + dx1, y]);
            dx1 -= 1;
            left = map[y][x + dx1];
            downleft = map[y + 1][x + dx1];
        }
        let dx2 = 1;
        let right = map[y][x + dx2];
        let downright = map[y + 1][x + dx2];
        while ((right === '.' || right === '|') && (downright === '#' || downright === '~')) {
            toFill.push([x + dx2, y]);
            dx2 += 1;
            right = map[y][x + dx2];
            downright = map[y + 1][x + dx2];
        }

        if (left === '#' && right === '#') {
            toFill.forEach(([fx, fy]) => {
                map[fy][fx] = '~';
            });
            fill(x, y - 1);
        } else {
            toFill.forEach(([fx, fy]) => {
                map[fy][fx] = '|';
            });
            if (left !== '#') {
                flow(fill, x + dx1, y);
            }
            if (map[y][x + dx2] === '.' && right !== '#') {
                flow(fill, x + dx2, y);
            }
        }
    };

    flow(fill, 500, lowY);
    const str = visualize(map);
    return (str.match(/[~|]/g) || []).length;
};
