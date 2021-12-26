/* eslint-disable no-extend-native */

/*
TODO
- Integer division, both rounding down and rounding up
- BFS, DFS, Flood Fill, other maze/pathfinding/graph algorithms and helpers
- 2D Grid helpers
- An iteration/evolution abstraction, allowing you to run the given function for a given number of times
- Find the minimum/maximum state for a given evolution algorithm when it strictly decreases or increases until the minimum/maximum
 */

const setup = {
    array() {
        // An alternative version of `.reduce` which doesn't allow (and thus doesn't require) returning the accumulator every iteration
        // Note: Because of how the accumulator is used this way, `acc` must be a reference type like Array or Object
        Array.prototype.accumulate = function accumulate(fn, acc) {
            for (let i = 0; i < this.length; i += 1) {
                fn.call(this, acc, this[i], i, this);
            }
            return acc;
        };

        // Count the number of occurrences of every unique value in the array
        Array.prototype.frequencies = function frequencies() {
            return this.accumulate((counts, value) => (counts[value] = (counts[value] ?? 0) + 1), {});
        };

        // Filter all duplicate values out of the array
        Array.prototype.uniques = function uniques() {
            return Array.from(new Set(this));
        };

        // Apply the given (optional) map operations on the second dimension of the n-dimensional array
        // If only one operation is specified, it's used on all items; otherwise operations are directly mapped by index
        Array.prototype.mapMap = function mapMap(...fns) {
            if (fns.length === 1) {
                fns = Array(this[0]?.length).fill(fns[0]);
            }
            return this.map((row) => {
                return row.map((cell, i) => (fns[i] ? fns[i](cell) : cell));
            });
        };

        // Zip the array with the other given arrays
        Array.prototype.zip = function zip(...values) {
            return [this, ...values].transpose();
        };

        // Calculate the prefix sum array
        Array.prototype.prefixSums = function prefixSums() {
            const result = [this[0]];
            for (let i = 1; i < this.length; i += 1) {
                result[i] = result[i - 1] + this[i];
            }
            return result;
        };

        // Apply a sliding window to the array, giving all sequences of items of the given size and with the given index offset between items
        // [1, 2, 3, 4, 5].window(2, 2) => [[1, 3], [2, 4], [3, 5]]
        Array.prototype.window = function window(size, offset = 1) {
            return Array.from(Array(this.length - size + 1)).map((_a, i) => {
                return Array.from(Array(size)).map((_b, j) => this[i + j * offset]);
            });
        };

        // Divide the array into slices of the given length
        // [1, 2, 3, 4, 5].slices(2) => [[1, 2], [3, 4]]
        Array.prototype.slices = function slices(size = 2) {
            return Array.from(Array(this.length / size)).map((_a, i) => this.slice(size * i, size * i + size));
        };

        //
        Array.prototype.select = function select(indices) {
            return indices.map(i => this[i]);
            // return indices.map((index) => {
            //     let value = this;
            //     for (const i of index) {
            //         value = value[i];
            //     }
            //     return value;
            // });
        };

        // Transpose the first two dimensions in the n-dimensional array (ie flip their order from [x][y] to [y][x])
        Array.prototype.transpose = function transpose() {
            return this[0]?.map((_1, x) => this.map((_2, y) => this[y][x])) ?? this;
        };

        // Group the array items based on the value returned by calling the given callback function on each item
        Array.prototype.groupBy = function groupBy(getId) {
            const groups = {};
            for (let i = 0; i < this.length; i += 1) {
                const id = getId(this[i], i);
                if (!(id in groups)) {
                    groups[id] = [];
                }
                groups[id].push(this[i]);
            }
            return groups;
        };

        // Shorthand for `filter.length`, count the number of items in the array matching the given condition
        Array.prototype.countIf = function countIf(condition) {
            if (typeof condition === 'function') {
                return this.filter(condition).length;
            } else {
                return this.filter(value => value === condition).length;
            }
        };

        // Alternatives to `Math.min` and `Math.max` that only return a value when it's unique, and otherwise return `null`
        Array.prototype.minUnique = function minUnique() {
            const min = Math.min(...this);
            return (this.indexOf(min) === this.lastIndexOf(min)) ? min : null;
        };
        Array.prototype.maxUnique = function maxUnique() {
            const max = Math.max(...this);
            return (this.indexOf(max) === this.lastIndexOf(max)) ? max : null;
        };

        // Sum or multiply all items in the Number array
        Array.prototype.sum = function sum() {
            return this.reduce((s, n) => s + n, 0);
        };
        Array.prototype.product = function product() {
            return this.reduce((s, n) => s * n, 1);
        };

        // Get the average value of the Number array
        Array.prototype.mean = function mean() {
            if (this.length === 0) {
                return undefined;
            }
            return this.sum() / this.length;
        };
        // Get the middle value of the Number array
        Array.prototype.median = function median() {
            if (this.length === 0) {
                return undefined;
            }
            const sorted = this.sort((a, b) => a - b);
            const parity = this.length % 2;
            return (sorted[(this.length + parity) / 2 - 1] + sorted[(this.length - parity) / 2]) / 2;
        };
        // Get the value that occurs the most in the Number array
        Array.prototype.mode = function mode() {
            if (this.length === 0) {
                return undefined;
            }
            return Object.entries(this.frequencies()).reduce(([k1, v1], [k2, v2]) => (v2 > v1 ? [k2, v2] : [k1, v1]))[0];
        };
        // Get the difference between the largest and smallest values of the Number array
        Array.prototype.range = function range() {
            if (this.length === 0) {
                return undefined;
            }
            return Math.max(...this) - Math.min(...this);
        };
    },
    number() {
        // True module, counterpart to `%` which performs a `remainder` operation
        Number.prototype.mod = function mod(n) {
            return ((this % n) + n) % n;
        };
    },
    string() {
        // Split the string into an array of substrings based on the given separator string or regex
        String.prototype.words = function words(separator = /\s/g) {
            return this.split(separator);
        };
        String.prototype.groups = function groups() {
            return this.words(/\n\n/g);
        };
        String.prototype.lines = function lines() {
            return this.words(/\n/g);
        };
        String.prototype.chars = function chars() {
            return this.words('');
        };

        // Split the string into an array of lines and call `words` on every individual line
        String.prototype.wordLines = function wordLines(regexSeparator = /\s/g) {
            return this.lines().map(line => line.words(regexSeparator));
        };
        String.prototype.charLines = function charLines() {
            return this.wordLines('');
        };

        // Parse the string into an array of all its contained integers
        String.prototype.ints = function ints() {
            return [...this.matchAll(/-?\d+/g)].map(Number);
        };

        // `map` For strings; map over characters while receiving and returning a string
        String.prototype.map = function map(fn) {
            return this.split('').map(fn).join('');
        };

        //
        String.prototype.substrings = function substrings(...lengths) {
            return lengths.map((length) => {
                return range(0, this.length - length).map(i => this.slice(i, i + length));
                // return this.slice(0, -length + 1).split('').map((_, i) => this.slice(i, i + length));
            }).flat();
        };

        //
        String.prototype.peek = function peek(n = Number.POSITIVE_INFINITY) {
            const offset = this._takeOffset ?? 0;
            return this.slice(offset, offset + n);
        };

        //
        String.prototype.drop = function drop(n) {
            const offset = this._takeOffset ?? 0;
            this._takeOffset = Math.min(this.length, offset + n);
            return this;
        };

        //
        String.prototype.take = function take(n) {
            const offset = this._takeOffset ?? 0;
            this._takeOffset = Math.min(this.length, offset + n);
            return this.slice(offset, offset + n);
        };

        //
        String.prototype.reset = function reset() {
            this._takeOffset = 0;
        };
    },
};

for (const fn of Object.values(setup)) {
    fn();
}

const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
};

const range = (from, to) => {
    if (!Array.isArray(from)) {
        from = [from];
    }
    if (!Array.isArray(to)) {
        to = [to];
    }
    const sizes = from.map((f, i) => to[i] - f);
    const length = sizes.reduce((acc, size) => gcd(acc, size));
    const step = sizes.map(size => size / Math.abs(length));

    const points = Array.from(Array(length + 1)).map((_, i) => from.map((f, j) => f + i * step[j]));
    return (points[0].length === 1 ? points.flat() : points);
};

const isAxisAligned = ([from, to]) => {
    return from.some((value, i) => value === to[i]);
};


class Grid {
    grid;

    constructor(data) {
        this.grid = data.map(row => row.slice());
    }

    static fromString(str) {
        const data = str.lines().map(line => line.split(''));
        return new Grid(data);
    }
}


module.exports = { gcd, range, isAxisAligned, Grid };
