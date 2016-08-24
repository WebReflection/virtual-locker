var vl = require('./index.js');

[
    [
        'should be able to lock itself',
        vl.lock('test.value')
    ],
    [
        'should not re-lock itself',
        !vl.lock('test.value')
    ],
    [
        'should spot conflicts with shorter patterns',
        !vl.lock('test')
    ],
    [
        'should spot conflicts with longer patterns',
        !vl.lock('test.value[5]')
    ],
    [
        'should not release shorter patterns',
        !vl.release('test')
    ],
    [
        'should not release longer patterns',
        !vl.release('test.value[5]')
    ],
    [
        'should accept different paths',
        vl.lock('test.title')
    ],
    [
        'should release exact match',
        vl.release('test.value')
    ],
    [
        'should accept an object as second argument',
        vl.lock('test.title', Object.prototype)
    ],
    [
        'should not affect the virtually locked object',
        !('test.title' in Object.prototype)
    ],
    [
        'should be able to virtually lock an object',
        vl.lock('test.value', Object.prototype)
    ],
    [
        'should not re-lock an object',
        !vl.lock('test.value', Object.prototype)
    ],
    [
        'should spot conflicts with shorter patterns per object',
        !vl.lock('test', Object.prototype)
    ],
    [
        'should spot conflicts with longer patterns per object',
        !vl.lock('test.value[5]', Object.prototype)
    ],
    [
        'should not release shorter patterns per object',
        !vl.release('test', Object.prototype)
    ],
    [
        'should not release longer patterns per object',
        !vl.release('test.value[5]', Object.prototype)
    ],
    [
        'should clean up an object as second argument',
        vl.release('test.title', Object.prototype)
    ]
]
.forEach(function (test, i, tests) {
    console.assert.apply(console, test.reverse());
    if (i === (tests.length - 1)) console.log('OK');
});