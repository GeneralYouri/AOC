module.exports = (input) => {
    const limit = Math.trunc(Number(input));

    const recipes = [3, 7];
    const elves = [0, 1];

    while (recipes.length < limit + 10) {
        const a = recipes[elves[0]];
        const b = recipes[elves[1]];
        const sum = a + b;
        const toAdd = (sum < 10) ? [sum] : [1, sum - 10];
        recipes.push(...toAdd);
        elves[0] = (elves[0] + 1 + a) % recipes.length;
        elves[1] = (elves[1] + 1 + b) % recipes.length;
    }

    return recipes.slice(limit, limit + 10).join('');
};
