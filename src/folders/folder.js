const _ = require('lodash');

const fs = require('fs');
const walkSync = require('walk-sync');

const sha256 = require('sha256');

function readAllFilesWithSubFolders(dir, filelist) {

    let files = fs.readdirSync(dir);

    filelist = filelist || [];
    _.forEach(files, function (file) {
        let path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            filelist = walkSync(path, filelist);

        } else {
            filelist.push({dir: path});
        }
    });
    return filelist;
}

function readFileContentInSha256(dir) {
    let content = fs
        .readFileSync(dir)
        .toString();
    return sha256(content);
}

module.exports = {
    readAllFilesWithSubFolders: readAllFilesWithSubFolders,
    readFileContentInSha256: readFileContentInSha256
};