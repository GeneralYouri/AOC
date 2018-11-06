let counts;
let rules;

const flipVertical = pattern => pattern.split('/').reverse().join('/');

const rotateClockwise = (pattern) => {
    const rows = pattern.split('/');
    return rows.map((row, rowIndex) => {
        return Array.from(Array(rows.length)).map((_, i) => rows[i][rowIndex]).reverse().join('');
    }).join('/');
};

const getVariants = (pattern) => {
    const variantSet = new Set();
    for (let dir = 0; dir < 4; dir += 1) {
        variantSet.add(pattern);
        variantSet.add(flipVertical(pattern));
        pattern = rotateClockwise(pattern);
    }
    return variantSet;
};

const splitPattern2 = (pattern) => {
    const rows = pattern.split('/');
    const subPatterns = [];

    for (let y = 0; y < rows.length; y += 2) {
        for (let x = 0; x < rows.length; x += 2) {
            subPatterns.push([
                rows[y][x] + rows[y][x + 1],
                rows[y + 1][x] + rows[y + 1][x + 1],
            ].join('/'));
        }
    }

    return subPatterns;
};

const mergePatterns3 = (pattern) => {

};

const get3x3RuleCounts = (inputRules, pattern) => {
    // Find the corresponding rule
    const variants = getVariants(pattern);
    const to = Array.from(variants).reduce((acc, variant) => acc || inputRules[variant], undefined);

    // Convert the output 4x4 into 2x2s
    const toCounts = {};
    const toSplit = splitPattern2(to);
    toSplit.forEach((toSub) => {
        const subVariants = getVariants(toSub);
        const toVariant = Array.from(subVariants).reduce((acc, variant) => (inputRules[variant] ? variant : acc), undefined);
        toCounts[toVariant] = (toCounts[toVariant] || 0) + 1;
    });

    return toCounts;
};

const iterate = (patternCounts) => {
    return Object.entries(patternCounts).reduce((newCounts, [pattern, count]) => {
        const subCounts = counts[pattern];
        Object.entries(subCounts).forEach(([subPattern, subCount]) => {
            newCounts[subPattern] = (newCounts[subPattern] || 0) + count * subCount;
        });
        return newCounts;
    }, {});
};

const countActivePixels = (patternCounts) => {
    return Object.entries(patternCounts).reduce((pixelCount, [pattern, count]) => pixelCount + count * (pattern.match(/#/g) || []).length, 0);
};

const visualize = pattern => pattern.replace(/\//g, '\n');

module.exports = (input, iterations = 18) => {
    const ruleData = input.split(/\n/g).map(line => line.split(' => '));
    const inputRules = ruleData.reduce((acc, [from, to]) => {
        acc[from] = to;
        return acc;
    }, {});

    const base = '.#./..#/###';
    // const v = getVariants(base);
    // v.forEach(a => console.log(visualize(a), '\n'));

    // Create a new rule book with pattern variants and splitting already applied
    counts = {};
    rules = {};
    ruleData.forEach(([from, to]) => {
        if (from.length === 5) {
            counts[from] = { [to]: 1 };
            rules[from] = [to];

            counts[to] = get3x3RuleCounts(inputRules, to);
            rules[to] = Object.keys(counts[to]);
        }
    });
    counts[base] = get3x3RuleCounts(inputRules, base);

    let patterns = { [base]: 1 };
    for (let i = 0; i < iterations / 3; i += 1) {
        patterns = iterate(patterns);
        console.log(patterns);
        console.log(countActivePixels(patterns));
    }

    return countActivePixels(patterns);
};
