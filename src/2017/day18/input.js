module.exports.default = module.exports;
module.exports.defInput = 'set i 31\n' +
    'set a 1\n' +
    'mul p 17\n' +
    'jgz p p\n' +
    'mul a 2\n' +
    'add i -1\n' +
    'jgz i -2\n' +
    'add a -1\n' +
    'set i 127\n' +
    'set p 316\n' +
    'mul p 8505\n' +
    'mod p a\n' +
    'mul p 129749\n' +
    'add p 12345\n' +
    'mod p a\n' +
    'set b p\n' +
    'mod b 10000\n' +
    'snd b\n' +
    'add i -1\n' +
    'jgz i -9\n' +
    'jgz a 3\n' +
    'rcv b\n' +
    'jgz b -1\n' +
    'set f 0\n' +
    'set i 126\n' +
    'rcv a\n' +
    'rcv b\n' +
    'set p a\n' +
    'mul p -1\n' +
    'add p b\n' +
    'jgz p 4\n' +
    'snd a\n' +
    'set a b\n' +
    'jgz 1 3\n' +
    'snd b\n' +
    'set f 1\n' +
    'add i -1\n' +
    'jgz i -11\n' +
    'snd a\n' +
    'jgz f -16\n' +
    'jgz a -19';
