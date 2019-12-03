const sum = nums => nums.reduce((s, n) => s + n, 0);

const massToFuel = mass => Math.trunc(mass / 3) - 2;

module.exports = input => sum(input.split(/\n/g).map(Number).map(massToFuel));
