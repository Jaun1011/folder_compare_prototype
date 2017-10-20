'use strict';

const Folder = require('./folder');

test('is hashvalue correct', () => {
    let hash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

    expect(Folder.readFileContentInSha256("./res_test/foldering/testfile_1")).toBe(hash)
});

test('are subfolders correct', () => {
    let folders = Folder.getAllFolders("./res_test/foldering/", ["res_test/foldering/sub_2/u_sub_11/"]);
    let result = [
        "res_test/foldering/sub_1/",
        "res_test/foldering/sub_1/sub_11/",
        "res_test/foldering/sub_2/",
        "res_test/foldering/sub_2/u_sub_11/",
        "res_test/foldering/"
    ];
    isEqual(folders, result);
});

test('does it copy', () => {
    let excludedFolders = [];

    let folders = Folder.readAllFoldersFs("res_test/foldering/");

    console.log(folders);
});

function isEqual(obj1, obj2) {
    expect(JSON.stringify(obj1)).toBe(JSON.stringify(obj2));
}