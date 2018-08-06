const { defInput } = require('./input.js');

class Matrix {
    constructor(data) {
        this.data = data;
    }

    // Unused
    get width() {
        return this.data[0] ? this.data[0].length : 0;
    }

    get height() {
        return this.data.length;
    }

    // Unused
    transpose() {
        return new Matrix(this.data.map((row, y) => row.map((item, x) => this.data[x][y])));
    }

    flipVertical() {
        return new Matrix(this.data.map((row, index) => this.data[this.data.length - 1 - index]));
    }

    // Unused
    flipHorizontal() {
        return new Matrix(this.data.map(row => row.map((item, index) => row[row.length - 1 - index])));
    }

    rotateClockwise() {
        return new Matrix(this.data.map((row, y) => row.map((item, x) => this.data[this.data.length - 1 - x][y])));
    }

    // Unused
    rotateCounterClockwise() {
        return new Matrix(this.data.map((row, y) => row.map((item, x) => this.data[x][row.length - 1 - y])));
    }

    toFormat() {
        return this.data.map(row => row.join('')).join('/');
    }

    visualize() {
        return this.data.map(row => row.join('')).join('\n') + '\n';
    }

    toString() {
        return this.visualize();
    }

    inspect() {
        return this.toString();
    }

    static fromFormat(str) {
        return new Matrix(str.split('/').map(row => row.split('')));
    }

    static variants(matrix) {
        const result = [];
        while (result.length < 8) {
            result.push(matrix, matrix.flipVertical());
            matrix = matrix.rotateClockwise();
        }
        return result;
    }

    static split(matrix) {
        let newSize = matrix.height;
        if (matrix.height > 2 && matrix.height % 2 === 0) {
            newSize = 2;
        } else if (matrix.height > 3 && matrix.height % 3 === 0) {
            newSize = 3;
        }

        const result = [];
        for (let y = 0; y < matrix.height; y += newSize) {
            const matrixRow = [];
            for (let x = 0; x < matrix.width; x += newSize) {
                const dataRows = [];
                for (let i = 0; i < newSize; i += 1) {
                    dataRows.push(matrix.data[y + i].slice(x, x + newSize));
                }
                matrixRow.push(new Matrix(dataRows));
            }
            result.push(matrixRow);
        }

        return result;
    }

    static merge(matrices) {
        return new Matrix(matrices.reduce((acc, matrixRow) => {
            matrixRow[0].data.forEach((_, index) => {
                const dataRow = [];
                matrixRow.forEach(matrix => dataRow.push(...matrix.data[index]));
                acc.push(dataRow);
            });
            return acc;
        }, []));
    }
}

function countActivePixels(matrix) {
    return matrix.toFormat().replace(/[^#]/g, '').length;
}

function enhanceMatrix(matrix) {
    const variants = Matrix.variants(matrix);
    const enhanced = variants.reduce((acc, variant) => acc || global.rules[variant.toFormat()], undefined);
    return Matrix.fromFormat(enhanced);
}

function iterate(image, i = 1) {
    const matrices = Matrix.split(image);

    const enhanced = matrices.map(matrixRow => matrixRow.map(enhanceMatrix));
    const merged = Matrix.merge(enhanced);

    return (i <= 1) ? merged : iterate(merged, i - 1);
}

function part1(input) {
    global.rules = input.reduce((acc, [from, to]) => {
        acc[from] = to;
        return acc;
    }, {});

    let image = Matrix.fromFormat('.#./..#/###');
    image = iterate(image, 5);

    return countActivePixels(image);
}

function part2(input) {
    global.rules = input.reduce((acc, [from, to]) => {
        acc[from] = to;
        return acc;
    }, {});

    let image = Matrix.fromFormat('.#./..#/###');
    image = iterate(image, 18);

    return countActivePixels(image);
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(line => line.split(' => '));

    console.log('Part 1 answer', part1(parsed));
    console.log('Part 2 answer', part2(parsed));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
