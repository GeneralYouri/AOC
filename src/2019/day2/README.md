# [Year 2019 Day 2](https://adventofcode.com/2019/day/2): 1202 Program Alarm

This day obviously reminds me of ElfCode from a past year.
Since the puzzle description specifies we'll be seeing more of this in future days, I've gone ahead and abstracted some of the functionality.

The main Intcode interpreter takes a list of input numbers to use as memory, and a collection of instructions that can be performed.
We iterate until our IP (instruction pointer) falls outside the list.
Every iteration we identify the instruction to execute, which also tells us how many arguments it consumes.

For today we're editing indices 1 and 2 before executing the Intcode.
For part 1 we enter the values 12 and 2, and return the value at index 0.
For part 2 we test all values 0-99 for both indices, and return for which of those values index 0 takes on a certain specified value.

---

The performance-based solution obviously doesn't use the abstracted Intcode interpreter.
Instead it runs a fairly low-level implementation, very similar to my initial code when speedcoding it.
Despite the fact that part 1's answer will be found during part 2's execution, combining them took too much overhead so they're separate.
