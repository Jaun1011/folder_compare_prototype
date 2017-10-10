let _ = require('lodash');

const fs = require('fs');
const fse = require('fs-extra');
const walkSync = require('walk-sync');
const Filehound = require('filehound');
const sha256 = require('sha256');


/**
 * get back all files in folder and subfolder
 * @param dir
 * @param filelist
 * @returns {*|Array}
 */
function readAllFilesWithSubFolders(dir) {
    return Filehound.create()
        .path(dir)
        .findSync();
}

function getAllFolders(path) {
    return Filehound.create()
        .path(path)
        .directory()
        .findSync();
}

function readFileContentInSha256(dir) {
    let content = fs
        .readFileSync(dir)
        .toString();
    return sha256(content);
}

function copy(file ,target) {
    fse.copySync(path.resolve(__dirname,'./init/xxx.json'), 'xxx.json');
}

module.exports = {
    readAllFilesWithSubFolders: readAllFilesWithSubFolders,
    readFileContentInSha256: readFileContentInSha256,
    getAllFolders: getAllFolders
};