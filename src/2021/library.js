/* eslint-disable no-extend-native */

const setup = {
    array() {
        Array.prototype.groups = function groups(size) {
            const result = [];
            for (let i = 0; i <= this.length - size; i += 1) {
                result.push(this.slice(i, i + size));
            }
            return result;
        };
        Array.prototype.pairs = function pairs() {
            return this.groups(2);
        };
        Array.prototype.triples = function triples() {
            return this.groups(3);
        };
        Array.prototype.quads = function quads() {
            return this.groups(4);
        };
        Array.prototype.quints = function quints() {
            return this.groups(5);
        };

        Array.prototype.countIf = function countIf(condition) {
            if (typeof condition === 'function') {
                return this.filter(condition).length;
            } else {
                return this.filter(value => value === condition).length;
            }
        };

        Array.prototype.sum = function sum() {
            return this.reduce((s, n) => s + n, 0);
        };

        Array.prototype.mapMap = function mapMap(...fns) {
            if (fns.length === 1) {
                fns = Array(this[0]?.length).fill(fns[0]);
            }
            return this.map((row) => {
                return row.map((cell, i) => (fns[i] ? fns[i](cell) : cell));
            });
        };

        Array.prototype.transpose = function transpose() {
            return this[0]?.map((_1, y) => this.map((_2, x) => this[x][y])) ?? this;
        };
    },
    string() {
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
        String.prototype.wordLines = function wordLines(regexSeparator = /\s/g) {
            return this.lines().map(line => line.words(regexSeparator));
        };
        String.prototype.charLines = function charLines() {
            return this.wordLines('');
        };

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
