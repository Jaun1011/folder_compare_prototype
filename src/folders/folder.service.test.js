'use strict';

const FolderService = require('./folder.service');

test('is hashvalue correct', () => {
    var files = [
        './res/files/inject_1.txt'
    ];

    FolderService.injectHoneyPod(files,'./res_test' , 3)

});

