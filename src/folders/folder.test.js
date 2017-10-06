const Folder = require('./folder');

test('is hashvalue correct', () => {
    expect(Folder.readFileContentInSha256("./res_test/foldering/testfile_1"))
        .toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
});

test('are subfolders correct', () => {
    let res = Folder.readAllFilesWithSubFolders("./res_test/foldering");

    expect(res[0].dir).toBe("./res_test/foldering/testfile_1");
    expect(res[1].dir).toBe("./res_test/foldering/testfile_2");
});