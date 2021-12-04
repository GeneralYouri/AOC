/* eslint-disable no-extend-native */

const setup = {
    array() {
        // Return the results from applying a sliding window to the array, of the given size and with the given index offset between items
        Array.prototype.window = function window(size, offset = 1) {
            const result = [];
            for (let i = 0; i <= this.length - size; i += 1) {
                const group = [];
                for (let j = 0; j < size; j += 1) {
                    group.push(this[i + j * offset]);
                }
                result.push(group);
            }
            return result;
        };
        Array.prototype.pairs = function pairs() {
            return this.window(2);
        };
        Array.prototype.triples = function triples() {
            return this.window(3);
        };
        Array.prototype.quads = function quads() {
            return this.window(4);
        };
        Array.prototype.quints = function quints() {
            return this.window(5);
        };

        // Shorthand filter.length, count the number of items in the array matching the given condition
        Array.prototype.countIf = function countIf(condition) {
            if (typeof condition === 'function') {
                return this.filter(condition).length;
            } else {
                return this.filter(value => value === condition).length;
            }
        };

        // Return the sum of the items in the number array
        Array.prototype.sum = function sum() {
            return this.reduce((s, n) => s + n, 0);
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

        // Transpose the first two dimensions in the given n-dimensional array (ie flip their order from [x][y] to [y][x])
        Array.prototype.transpose = function transpose() {
            return this[0]?.map((_1, x) => this.map((_2, y) => this[y][x])) ?? this;
        };
    },
    string() {
        // Split the string into an array of substrings based on the given separator string or regex
        String.prototype.words = function words(regexSeparator = /\s/g) {
            return this.split(regexSeparator);
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
            return this.lines().map(Number);
        };
        String.prototype.customInts = function customInts() {
            return [...this.matchAll(/[\d-]+/g)].map(Number);
        };
    },
};

for (const fn of Object.values(setup)) {
    fn();
}

module.exports = {};
