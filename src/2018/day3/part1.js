module.exports = (input) => {
    const lines = input.split(/\n/g);
    const claims = lines.map((line) => {
        const [id, rest] = line.slice(1).split(' @ ');
        const [pos, size] = rest.split(': ');
        const [x, y] = pos.split(',');
        const [w, h] = size.split('x');
        return [Number(id), [Number(x), Number(y)], [Number(w), Number(h)]];
    });

    const fabric = Array.from(new Array(1000)).map(() => Array.from(new Array(1000)).fill(0));
    claims.forEach(([id, [x, y], [w, h]]) => {
        for (let i = 0; i < w; i += 1) {
            for (let j = 0; j < h; j += 1) {
                fabric[x + i][y + j] += 1;
            }
        }
    });

    return fabric.reduce((sum, row) => {
        return sum + row.reduce((rowSum, count) => {
            if (count > 1) {
                rowSum += 1;
            }
            return rowSum;
        }, 0);
    }, 0);
};
