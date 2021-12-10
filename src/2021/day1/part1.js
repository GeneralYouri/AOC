require('../library.js');

module.exports = input => input.ints().window(2).countIf(([a, b]) => a < b);
