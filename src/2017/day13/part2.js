// const groupByCycle = (scanners) => {
//     const delaysByCycle = scanners.reduce((acc, [depth, range]) => {
//         const cycle = range * 2 - 2;
//         const baseDelay = depth % cycle;
//
//         if (!acc[cycle]) {
//             acc[cycle] = [];
//         }
//
//         acc[cycle].push(baseDelay);
//         return acc;
//     }, {});
//
//     return Object.keys(delaysByCycle).map(cycle => [Number(cycle), delaysByCycle[cycle]]);
// };
//
// const gcd = (a, b) => {
//     let x = Math.abs(a);
//     let y = Math.abs(b);
//     while (y) {
//         [x, y] = [y, x % y];
//     }
//     return x;
// };
//
// const lcm = (x, y) => {
//     return (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));
// };

// module.exports = (input) => {
//     console.log(1);
//     const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number));
//
//     const cycles = groupByCycle(scanners);
//
//     // First fill a structure with all possible cycle+delay combos allowed
//     const allowedDelays = {};
//     for (const [cycle] of cycles) {
//         allowedDelays[cycle] = {};
//         for (let i = 0; i < cycle; i += 1) {
//             allowedDelays[cycle][i] = true;
//         }
//     }
//
//     // Then iterate the input cycle+delay combos, disabling both them and their multiples
//     for (const [cycle, delays] of cycles.slice()) {
//         const expandTo = cycles.filter(([cycle2]) => cycle2 >= cycle && cycle2 % cycle === 0);
//         expandTo.forEach(([cycle2]) => {
//             for (let delta = 0; delta < cycle2; delta += cycle) {
//                 for (const delay of delays) {
//                     if (delay + delta < cycle2) {
//                         allowedDelays[cycle2][delay + delta] = false;
//                     }
//                 }
//             }
//         });
//
//         // When all delays of a smaller cycle are 'absorbed', we can safely delete it
//         if (expandTo.length > 1 || (expandTo.length === 1 && expandTo[0][0] !== cycle)) {
//             delete allowedDelays[cycle];
//         }
//     }
//
//     // Finally filter out any remaining out-of-bounds data and tidy up the data structure
//     const allowedCycles = Object.keys(allowedDelays).map((cycle) => {
//         const cycleDelays = allowedDelays[cycle];
//         const delays = Object.keys(cycleDelays).filter(delay => cycleDelays[delay]).map(Number);
//         return [Number(cycle), delays];
//     });
//     // console.log(allowedCycles);
//
//     const allowOne = allowedCycles.filter(([, delays]) => delays.length === 1).map(([mod, [base]]) => [base, mod]);
//     // console.log(allowOne);
//
//     const consumed = [];
//     const [base, mod] = allowOne.reverse().reduce(([base1, mod1], [base2, mod2]) => {
//         let newBase = base1;
//         while (newBase % mod2 !== base2) {
//             newBase += mod1;
//         }
//         consumed.push(mod2);
//         return [newBase, lcm(mod1, mod2)];
//     }, [0, 1]);
//     console.log(base, mod);
//
//     console.log(allowedCycles);
//     for (let delay = base; true; delay += mod) {
//         for (const [mod2, bases2] of allowedCycles) {
//             if (consumed.includes(mod2)) {
//                 continue;
//             }
//             if (!bases2.includes(delay % mod2)) {
//                 break;
//             }
//             const answer = delay;
//             const notCaught = scanners.every(([depth, range]) => {
//                 const cycle = range * 2 - 2;
//                 const caught = (depth + delay) % cycle === 0;
//                 return !caught;
//             });
//             console.log(notCaught);
//             return answer;
//         }
//     }
// };
//
//
// // An alternate version which splits up the work on disabling cycle+delay combos
// const alternate = (input) => {
//     console.log(2);
//     const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number));
//
//     const cycles = groupByCycle(scanners);
//
//     // First fill a structure with all possible cycle+delay combos allowed
//     const allowedDelays = {};
//     for (const [cycle] of cycles) {
//         allowedDelays[cycle] = {};
//         for (let i = 0; i < cycle; i += 1) {
//             allowedDelays[cycle][i] = true;
//         }
//     }
//
//     // Then expand the input cycle+delay combos to pregenerate all disallowed ones
//     const biggestCycle = cycles[cycles.length - 1][0];
//     const expandedCycles = cycles.map(([cycle, delays]) => {
//         const expandedDelays = [];
//         for (let delta = 0; delta < biggestCycle; delta += cycle) {
//             expandedDelays.push(...delays.map(x => x + delta));
//         }
//         const filteredDelays = expandedDelays.filter(x => x < biggestCycle).sort((a, b) => a - b);
//         return [cycle, filteredDelays];
//     });
//
//     // Then iterate this expanded input cycle+delay combos, disabling all of them
//     expandedCycles.slice().forEach(([cycle, delays], i) => {
//         const expandTo = cycles.filter(([cycle2]) => cycle2 >= cycle && cycle2 % cycle === 0);
//         expandTo.forEach(([cycle2]) => {
//             delays.forEach((delay) => {
//                 allowedDelays[cycle2][delay] = false;
//             });
//         });
//
//         // When all delays of a smaller cycle are 'absorbed', we can safely delete it
//         if (expandTo.length > 1 || (expandTo.length === 1 && expandTo[0][0] !== cycle)) {
//             delete expandedCycles[i];
//             delete allowedDelays[cycle];
//         }
//     });
//
//     // Finally filter out any remaining out-of-bounds data and tidy up the data structure
//     const allowedCycles = Object.keys(allowedDelays).map((cycle) => {
//         const cycleDelays = allowedDelays[cycle];
//         const delays = Object.keys(cycleDelays).filter(delay => cycleDelays[delay]).map(Number);
//         return [Number(cycle), delays];
//     });
//     console.log(allowedCycles);
// };

/**
 * TODO: Instead of simulating via the generator, maybe we can calculate the answer instead?
 * For each scanner we can determine their cycle, and thus on which delays they would catch the packet
 * We then need to somehow return the lowest delay for which no scanner would catch the packet
 */
module.exports = (input) => {
    const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number)).map(([depth, range]) => [depth, range * 2 - 2]);

    const isCaught = (delay) => {
        for (const [depth, range] of scanners) {
            if (((depth + delay) % range) === 0) {
                return true;
            }
        }
        return false;
    };

    let delay = 0;
    while (isCaught(delay)) {
        delay += 1;
    }
    return delay;
};
