'use strict';

const _ = require('lodash');
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

function copy(filepath ,target) {
    fse.copySync(filepath , target);
}

function remove(filepath) {
    fs.exists(filepath, function(exists) {
        if(exists) {
            fs.unlink(filepath);
        }
    });
}
module.exports = {
    readAllFilesWithSubFolders: readAllFilesWithSubFolders,
    readFileContentInSha256: readFileContentInSha256,
    getAllFolders: getAllFolders,
    copy:copy,
    remove:remove
};