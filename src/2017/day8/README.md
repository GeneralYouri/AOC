# [Year 2017 Day 8](https://adventofcode.com/2017/day/8): I Heard You Like Registers

For this day we're once again looking for two almost identical answers: highest value at the end, and highest value during the algorithm.
The process itself involves some input parsing to interpret and execute the little pseudo language that it forms.
We only have to be able to increment, decrement, and test conditions on the registers.

---

For the performance-based solution we've obviously combined parts 1&2 again.
We've also dumbed down the code a bit and removed some abstractions since they're not free in JS.
