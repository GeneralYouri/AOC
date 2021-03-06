const formatTimeCell = ms => Number(ms.toPrecision(10)).toFixed(6).slice(0, 11).padStart(11, ' ');

const formatMemoryCell = mbs => Number(mbs.toPrecision(7)).toFixed(2).slice(0, 6).padStart(6, ' ');

const formatHeader = (year, day = '', part = '') => {
    let header = year;
    header += day ? '.' + day.toString().padStart(2, ' ') : '';
    header += part ? '.' + part.toString().padStart(1, ' ') : '';
    return header.padEnd(9, ' ');
};

const formatInfo = ([year, day = '', part = ''], time, answer) => {
    const header = formatHeader(year, day, part);
    const timeStr = formatTimeCell(time);
    const memoryStr = formatMemoryCell(process.memoryUsage().heapUsed / 1024 / 1024);
    return `${header} ✅ | \x1b[38;5;240mTime:\x1b[0m ${timeStr} ms | \x1b[38;5;240mMemory:\x1b[0m ${memoryStr} MB | \x1b[38;5;240mAnswer:\x1b[0m ${answer}`;
};

const formatError = ([year, day = '', part = ''], message) => {
    const header = formatHeader(year, day, part);
    return `\x1b[31m${header}\x1b[0m ❌ | \x1b[31mSkip:\x1b[0m ${' '.repeat(14)} | ${' '.repeat(17)} | \x1b[31m${message}\x1b[0m`;
};

const formatSeparator = (char = '-') => `${char.repeat(12)}+${char.repeat(22)}+${char.repeat(19)}+${char.repeat(16)}`;

const formatTotal = (year, time, solved, solvedMax = 50) => {
    const header = year.toString().padEnd(9, ' ');
    const timeStr = formatTimeCell(time);
    const memoryStr = formatMemoryCell(process.memoryUsage().heapUsed / 1024 / 1024);
    const solvedStr = solved.toString().padStart(2, ' ');
    const emote = solved === solvedMax ? '✅' : '❌';
    return `${header} ${emote} | \x1b[38;5;240mTime:\x1b[0m ${timeStr} ms | \x1b[38;5;240mMemory:\x1b[0m ${memoryStr} MB | \x1b[38;5;240mSolved:\x1b[0m ${solvedStr} / ${solvedMax}`;
};


const runSolution = async (name, fn, input) => {
    const start = process.hrtime.bigint();
    const answer = await fn.call(null, ...input);
    const time = process.hrtime.bigint() - start;
    const memory = process.memoryUsage().heapUsed / 1024 / 1024;

    console.log(`${'-'.repeat(5)} ${name} ${'-'.repeat(5)}`);
    console.log(`\x1b[38;5;240mAnswer:\x1b[0m ${answer}`);
    console.log(`\x1b[38;5;240mTime:  \x1b[0m ${Number(time / 1000n) / 1000} ms`);
    console.log(`\x1b[38;5;240mMemory:\x1b[0m ${Math.round(memory * 100) / 100} MB`);
    console.log('-'.repeat(2 * 5 + 2 + name.length));
};

module.exports = {
    formatInfo,
    formatError,
    formatSeparator,
    formatTotal,
    runSolution,
};
