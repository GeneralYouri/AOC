# [Year 2017 Day 4](https://adventofcode.com/2017/day/4): High-Entropy Passphrases

Similarly to day 1, both parts are almost identical - test all words in a row for uniqueness.
The only difference is that in part 2 we're looking for unique combinations, not permutations.
To determine uniqueness we use a simple `Set`.

---

Again not much can be done on the performance-focused approach here.
We mostly save time on combining parts 1 & 2 and removing the generalisations as they tend to have performance costs.
