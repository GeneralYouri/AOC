// Since every non-whitespace character is included in the path (and the path has no loops), we can count those characters
// The only extra requirement is doubly counting intersections, as these are the only characters that can be visited twice
module.exports = (input) => {
    const mapData = input.split(/\n/g).map(line => line.split(''));
    let count = input.replace(/\s/g, '').length;

    for (let y = mapData.length - 2; y > 0; y -= 1) {
        for (let x = mapData[y].length - 2; x > 0; x -= 1) {
            if (mapData[y][x] !== ' ' && mapData[y][x - 1] !== ' ' && mapData[y][x + 1] !== ' ' && mapData[y - 1][x] !== ' ' && mapData[y + 1][x] !== ' ') {
                count += 1;
            }
        }
    }

    return count;
};
