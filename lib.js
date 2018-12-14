const formatTime = ms => Number(ms.toPrecision(7)).toFixed(3);

const formatHeader = (year, day = '', part = '') => {
    let header = year;
    header += day ? '.' + day.toString().padStart(2, ' ') : '';
    header += part ? '.' + part.toString().padStart(1, ' ') : '';
    return header.padEnd(9, ' ');
};

const formatInfo = ([year, day = '', part = ''], time, answer) => {
    const header = formatHeader(year, day, part);
    const timeStr = formatTime(time).slice(0, 8).padStart(8, ' ');
    return `${header} ✅ | \x1b[38;5;240mTime:\x1b[0m ${timeStr} ms | \x1b[38;5;240mAnswer:\x1b[0m ${answer}`;
};

const formatError = ([year, day = '', part = ''], message) => {
    const header = formatHeader(year, day, part);
    return `\x1b[31m${header}\x1b[0m ❌ | \x1b[31mSkip:\x1b[0m             | \x1b[31m${message}\x1b[0m`;
};

const formatSeparator = (char = '-') => `${char.repeat(12)}+${char.repeat(19)}+${char.repeat(16)}`;

const formatTotal = (year, time, solved, solvedMax = 50) => {
    const header = year.toString().padEnd(9, ' ');
    const timeStr = formatTime(time).slice(0, 8).padStart(8, ' ');
    const solvedStr = solved.toString().padStart(2, ' ');
    const emote = solved === solvedMax ? '✅' : '❌';
    return `${header} ${emote} | \x1b[38;5;240mTime:\x1b[0m ${timeStr} ms | \x1b[38;5;240mSolved:\x1b[0m ${solvedStr} / ${solvedMax}`;
};

const runSolution = (name, fn, input) => {
    const start = process.hrtime();
    const answer = fn(...input);
    const time = process.hrtime(start);
    console.log('-----', name, '-----');
    console.log('\x1b[38;5;240mAnswer:\x1b[0m', answer);
    console.log('\x1b[38;5;240mTime:  \x1b[0m', time[0] * 1000 + time[1] / 1000000, 'ms');
    console.log('------------------');
};

module.exports = {
    formatInfo,
    formatError,
    formatSeparator,
    formatTotal,
    runSolution,
};
