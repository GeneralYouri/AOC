# AOC
Advent of Code Solutions (JS) - http://adventofcode.com/

---

- Recommend NodeJS v10.7.0+ due to using `process.hrtime.bigint()`

Run via
```bash
node .
```
By default this will attempt to run every puzzle solution from every year, in order.

Run via `node . --help` for information about accepted arguments and flags, such as which puzzle(s) to run and what input to use.

Alternatively you can also run puzzle solutions individually by executing the puzzle folder's index file (for example `node src/2018/day1`).
This approach also lets you customize the puzzle input in a similar way, through additional command line arguments.

---

Per puzzle you'll find the following contents:
- An input text file containing the default input to work with, as obtained via the official Advent of Code website.
- A main solution file for both parts containing the puzzle solution for just that part; if possible generic / abstract / accepting input.
- A test file for each solution file that tests the code against various meaningful inputs/outputs.
  These contain sample inputs/outputs from the official website, the official input also from the official website, and other interesting input/output combinations.

---
