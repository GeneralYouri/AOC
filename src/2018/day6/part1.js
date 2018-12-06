const manhattan = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

module.exports = (input) => {
    const coordinates = input.split(/\n/g).map(line => line.split(', ').map(Number));

    const sizes = coordinates.map(() => 0);
    const infinites = [];

    for (let x = 0; x < 400; x += 1) {
        for (let y = 0; y < 400; y += 1) {
            let closestCoord = null;
            let closestDistance = Number.POSITIVE_INFINITY;

            coordinates.forEach(([cx, cy], coord) => {
                const distance = manhattan([x, y], [cx, cy]);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCoord = coord;
                } else if (distance === closestDistance) {
                    closestCoord = null;
                }
            });

            if (closestCoord !== null) {
                sizes[closestCoord] += 1;
                if (x === 0 || x === 399 || y === 0 || y === 399) {
                    infinites.push(closestCoord);
                }
            }
        }
    }

    infinites.forEach((index) => {
        sizes[index] = 0;
    });
    return Math.max(...sizes);
};
