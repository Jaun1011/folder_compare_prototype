let _ = require('lodash');

const fs = require('fs');
const walkSync = require('walk-sync');
const Filehound = require('filehound');
const sha256 = require('sha256');


/**
 * get back all files in folder and subfolder
 * @param dir
 * @param filelist
 * @returns {*|Array}
 */
function readAllFilesWithSubFolders(dir, filelist) {
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

module.exports = {
    readAllFilesWithSubFolders: readAllFilesWithSubFolders,
    readFileContentInSha256: readFileContentInSha256,
    getAllFolders: getAllFolders
};