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

For this solution, testing various noun,verb combos shows an obvious pattern to be found in the output values.
For my input, verb +1 means output +460800, and noun +1 means output +1; only the verb delta varies between inputs.

With this knowledge we run an extremely low-level stripped down version of the Intcode logic on two memory banks at once.
One memory bank is set to noun,verb of 12,2 for part 1, the other uses 0,0 which gives a base output value.
With these two output values we find the value of a verb, and can thus extrapolate what noun,verb is needed for our target output value.
