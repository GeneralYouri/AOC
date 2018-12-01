module.exports = (input) => {
    const changes = input.split(/\n/g);
    const seen = {};
    let frequency = 0;
    while (true) {
        for (const change of changes) {
            frequency += Number(change);
            console.log(Number(change), frequency);
            if (seen[frequency]) {
                return frequency;
            }
            seen[frequency] = true;
        }
    }
};
