# [Year 2017 Day 7](https://adventofcode.com/2017/day/7): Recursive Circus

Part 1 is simple here and only requires input processing and some basic logic.
Part 2 involves actually applying the tree structure, which I am *not* a fan of doing in JS.

I initially used recursion to walk the tree and find the unbalanced node, but as usual removing the recursion made it simpler and faster.
Now I use a custom Stack data structure to store, process and discard all Leaves, turning their Parents into new Leaves.
This essentially lets us iterate the Tree bottom-up, until we find the lowest hanging unbalanced Node - that's where the problem lies.

---

This day annoys me... so far the only change for the performance-based solution is combining the two parts.
