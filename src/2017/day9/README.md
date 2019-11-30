# [Year 2017 Day 9](https://adventofcode.com/2017/day/9): Stream Processing

I've written programs before that test for correct bracket placement (I think there's even a related AoC puzzle), so this feels familiar.
This ends up being a little simpler though, as you can just go through your input stream and handle characters one by one.
You keep track of the number of unclosed groups, for every new group this doubles as the score it adds to part 1.
Meanwhile we use a boolean for the garbage state, which also lets us easily count the garbage for part 2.

---

For a performance-based solution we literally just combine parts 1&2, nothing special (yet?).
