# [Year 2017 Day 1](https://adventofcode.com/2017/day/1): Inverse Captcha

The two parts are easily generalised: Find all digits that match the digit n indices further in the cycling input string.
For part 1 we look only 1 index further, while for part 2 we look length/2 indices further (1065 for my 2130-length input).

Some functional programming is applied to find the result, accepting the above variation as argument.
The input if filtered down to only those digits that match the supplied condition, the returned result is the reduced sum.

---

The performance-focused approach does away with the slowness and repetitiveness of the functional approach.
Instead it combines both parts into a single for loop, manually testing every digit in the input one by one.
This is essentially a straight-forward translation of the puzzle description.

Modulo are used to ensure the checked indices are correct.
A small time save is achieved by appending the first digit to the end of the input, removing the modulo for part1.

Some further optimization ideas were tried, but didn't result in faster runtimes:
- Append to the input not just the first digit, but the first half of the input, in order to get rid of the modulo for part2.
  The cost of appending this many characters, plus the part1 complications, are more expensive than performing the modulo for part2.
- Use regexes to count the matches for each digit 1-9 separately.
  Works for part1, but way too slow for part2; using only for part1 doesn't provide a speedup.
