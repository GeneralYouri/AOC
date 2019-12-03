const sum = nums => nums.reduce((s, n) => s + n, 0);

const massToFuel = mass => Math.max(0, Math.trunc(mass / 3) - 2);

module.exports = (input) => {
    let nums = input.split(/\n/g).map(Number);
    let fuel = 0;
    while (sum(nums) > 9) {
        nums = nums.map(massToFuel);
        fuel += sum(nums);
    }
    return fuel;
};
