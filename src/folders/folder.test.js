'use strict';

const Folder = require('./folder');
const fs = require('fs');


test('is hashvalue correct', () => {
    let hash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

    expect(Folder.readFileContentInSha256("./res_test/foldering/testfile_1")).toBe(hash)
});



test('exclude path 1', () => {
    let excludedFolders = [
        "res_test/foldering/sub_1/sub_11/",
        "res_test/foldering/sub_2/sub_11/"
    ];
    let folders = [
        "res_test/foldering/sub_1/sub_11/",
        "res_test/foldering/sub_2/sub_11/",
        "res_test/foldering/",
        "res_test/foldering/sub_1/",
        "res_test/foldering/sub_2/",
        "res_test/foldering/sub_1/sub_11/aaaa/",
        "res_test/foldering/sub_2/sub_11/aaa/"
    ];

    let expect = [
        'res_test/foldering/',
        'res_test/foldering/sub_1/',
        'res_test/foldering/sub_2/']
    ;

    let result = Folder.excludePaths(folders, excludedFolders);
    isEqual(expect, result)
});

test('exclude path 2', () => {
    let excludedFolders = [
        "res_test/foldering/sub_1/"
    ];

    let folders = [
        "res_test/foldering/sub_1/sub_11/",
        "res_test/foldering/sub_2/sub_11/",
        "res_test/foldering/",
        "res_test/foldering/sub_1/",
        "res_test/foldering/sub_2/",
        "res_test/foldering/sub_1/sub_11/aaaa/",
        "res_test/foldering/sub_2/sub_11/aaa/"
    ];

    let expect = [
        "res_test/foldering/sub_2/sub_11/",
        'res_test/foldering/',
        'res_test/foldering/sub_2/',
        "res_test/foldering/sub_2/sub_11/aaa/"
    ];

    let result = Folder.excludePaths(folders, excludedFolders);
    isEqual(expect, result)
});
test('exclude path dfs', () => {
    let excludedFolders = [
        ".*dfs.*",
        ".*DFS.*",
    ];
    let folders = [
        "res_test/foldering/sub_1/asdf_dfs_asdf/",
        "res_test/foldering/sub_2/DFSsub_11/",
        "res_test/foldering/",
        "res_test/foldering/dfs/blub",
        "res_test/foldering/sub_2/",
        "res_test/foldering/sub_1/sub_11/aaaa/",
        "res_test/foldering/dfs_private/sub_11/aaa/"
    ];

    let expect = [
        "res_test/foldering/",
        "res_test/foldering/sub_2/",
        "res_test/foldering/sub_1/sub_11/aaaa/"
    ];

    let result = Folder.excludePaths(folders, excludedFolders);
    isEqual(expect, result)
});

test('exclude path', () => {
    let excludedFolders = [
    ];
    let folders = [
        "res_test/foldering/sub_1/sub_11/",
        "res_test/foldering/sub_2/sub_11/",
        "res_test/foldering/",
        "res_test/foldering/sub_1/",
        "res_test/foldering/sub_2/",
        "res_test/foldering/sub_1/sub_11/aaaa/",
        "res_test/foldering/sub_2/sub_11/aaa/"
    ];

    let final = Folder.excludePaths(folders, excludedFolders);
    isEqual(final, folders)
});

function isEqual(obj1, obj2) {
    expect(JSON.stringify(obj1)).toBe(JSON.stringify(obj2));
}