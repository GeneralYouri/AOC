require('../library.js');

module.exports = input => input.ints().pairs().countIf(([a, b]) => a < b);
