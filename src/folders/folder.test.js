let Folder = require('./folder');

test('is foldering correct', () => {
    let files = Folder.readAllFilesWithSubFolders("./", []);

    console.log(files);
});