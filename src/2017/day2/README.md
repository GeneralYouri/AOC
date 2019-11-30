# [Year 2017 Day 2](https://adventofcode.com/2017/day/2): Corruption Checksum

For part 1 we again use some functional programming.
The answer is the reduced sum of maximum values minus the reduced sum of minimum values.
Part 2's answer is the reduced sum of the even division results.
Per row we simply test all combinations of two numbers to find the evenly divisible pair.

---

The performance-focused approach is pretty much identical in approach; ofcourse both parts are combined as well.
The performance gains come from replacing higher-level and functional code with lower-level code.

We make sure to only iterate all pairs once instead of twice, and determine the higher of the two numbers before division.
Whole number division is tested for using the bitwise OR operator.

Part 2 seems like it could maybe be done faster, but I'm coming up blank.
