# [Year 2017 Day 6](https://adventofcode.com/2017/day/6): Memory Reallocation

Depending on the implementation, this day's two parts can be identical, apart from the value returned at the end.
To find the cycle length you're likely to look for the first repeat state; the cycle length is the number of steps in between.

To make this happen my solution stores all states in a Map, recording not just the state but also what iteration it was.
We have 16 memory banks, the most obvious data structure is an array of 16 numbers.
To store such a state in a Map, I've chosen for a simple hash function that joins the 16 numbers with commas (the default array stringify).

Performing the algorithm and redistributing a bank is straight-forward.
You can calculate how much every bank should get and only update once, but due to the low numbers used this doesn't save any time.

---

For the performance-based solution we focus on by far the biggest slowdown: the use of an array and the resulting slow string hash.
We have 16 memory banks, and my input only contains numbers 0-15, so 16x4 bits seems doable, in fact this is how others have optimized too.
Due to JS' limited 32-bit bitwise math I'd have to split this up in 2 to be able to use it.

Unfortunately it doesn't work for all inputs (including mine), since during the algorithm you can reach values of 16 or 17.
To prevent overflow issues I had to at least keep my data structure as an array of 16 numbers.
Hashes don't need to be perfect though, so after some fiddling I chose a hash that works for several inputs while not using all banks.
