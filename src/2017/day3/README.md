# [Year 2017 Day 3](https://adventofcode.com/2017/day/3): Spiral Memory

For part 1, due to the mathematical way of generating this spiral, there are some useful patterns to be found.
For example, moving from the start to the bottom-right iterated the squares of all odd numbers.
As a result, using some clever math we can straight up calculate the exact answer to part 1.

For part 2 it's a bit more difficult, as new numbers also depend on previous numbers, a little bit like Fibonacci but with varying offsets.
So here we actually simulate the entire spiral creation process to find the answer.
We can calculate a reasonable upper limit though, as the growth speed is limits.
Growth speed does increase the bigger our target is, because the sides of the spiral get bigger, so this estimate limits our input somewhat.

This upper limit is used to fit the generated spiral into an array of static size, removing the issues of borderline indices and such.
During the spiral generation we use some logic to avoid extra math (only add/subtract relevant values), and correctly turn the corners.

---

Not much can be done on the performance-focused approach here.
Part 1 is already blazingly fast due to the math-based approach.
For part 2 some of the logic and syntax, mainly regarding the position deltas, is improved to reduce some computation.
Luckily this was already by far the fastest day.
