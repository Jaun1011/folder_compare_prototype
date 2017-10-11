'use strict';

const Honeypot = require('./honeypot');

test('is hashvalue correct', () => {
    var files = [
        './res/files/inject_1.txt'
    ];
    Honeypot.injectHoneyPod(files,'./res_test' , 3)
});

