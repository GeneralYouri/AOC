module.exports = (input) => {
    const lines = input.split(/\n/g).map(line => line.match(/(.*)/).slice(1));
    for (const line of lines) {
        console.log(line);
    }

    const N = input.split(/,/g).map(Number);
    return N.reduce((sum, n) => sum + n, 0);
};
