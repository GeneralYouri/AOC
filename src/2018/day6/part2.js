const manhattan = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

module.exports = (input, distanceLimit = 10000) => {
    const coordinates = input.split(/\n/g).map(line => line.split(', ').map(Number));

    const X = coordinates.map(([cx]) => cx);
    const Y = coordinates.map(([, cy]) => cy);
    const [lowX, highX] = [Math.min(...X), Math.max(...X)];
    const [lowY, highY] = [Math.min(...Y), Math.max(...Y)];

    let regionSize = 0;
    for (let x = lowX; x <= highX; x += 1) {
        for (let y = lowY; y <= highY; y += 1) {
            const sum = coordinates.reduce((acc, [cx, cy]) => acc + manhattan([x, y], [cx, cy]), 0);
            if (sum < distanceLimit) {
                regionSize += 1;
            }
        }
    }
    return regionSize;
};
