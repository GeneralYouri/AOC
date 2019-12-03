# [Year 2019 Day 1](https://adventofcode.com/2019/day/1): The Tyranny of the Rocket Equation

Similarly to 2018 day 1, perform summation over the input list of numbers, but with a twist this time: `n/3 - 2` for every input `n`.
For part 2, for every input `n`, we have to keep adding `n/3 - 2` until the amount becomes subzero.

---

The performance-based solution does away with some of the abstractions like the `sum` function, and combines both parts in a single loop.
