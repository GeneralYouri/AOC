// module.exports = (input) => {
//     const lines = input.split(/\n/g);
//     const claims = lines.map((line) => {
//         const [id, rest] = line.slice(1).split(' @ ');
//         const [pos, size] = rest.split(': ');
//         const [x, y] = pos.split(',').map(Number);
//         const [w, h] = size.split('x');
//         return [Number(id), [Number(x), Number(y)], [Number(w), Number(h)]];
//     });
//
//     const fabric = Array.from(Array(1000)).map(() => Array(1000).fill(0));
//     claims.forEach(([id, [x, y], [w, h]]) => {
//         for (let i = x; i < x + w; i += 1) {
//             for (let j = y; j < y + h; j += 1) {
//                 fabric[i][j] += 1;
//             }
//         }
//     });
//
//     return fabric.reduce((sum, row) => {
//         return sum + row.reduce((rowSum, count) => {
//             if (count > 1) {
//                 rowSum += 1;
//             }
//             return rowSum;
//         }, 0);
//     }, 0);
// };

module.exports = (input) => {
    const claims = input.split(/\n/g).map(line => line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).slice(1).map(Number));

    const fabric = Array.from(Array(1000)).map(() => Array(1000).fill(0));
    claims.forEach(([, x, y, w, h]) => {
        for (let i = x; i < x + w; i += 1) {
            for (let j = y; j < y + h; j += 1) {
                fabric[i][j] += 1;
            }
        }
    });

    let sum = 0;
    for (let i = 0; i < 1000; i += 1) {
        for (let j = 0; j < 1000; j += 1) {
            if (fabric[i][j] > 1) {
                sum += 1;
            }
        }
    }
    return sum;
};
