require('../library.js');

module.exports = input => input.ints().window(2, 3).countIf(([a, b]) => a < b);
