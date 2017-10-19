'use strict';

const _ = require('lodash');
const fs = require('fs');
const fse = require('fs-extra');
const walkSync = require('walk-sync');
const Filehound = require('filehound');
const sha256 = require('sha256');
const UUID = require('uuid/v4');


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

function getAllFolders(path, excludedFolders) {
    return Filehound.create()
        .path(path)
        .directory()
        .findSync();
}

function removeFolders(target, folders) {
    return _.remove(target,(item) => {
        for (let i = 0 ;i < folders.length; i++){
            if (item.match(folders[i]))
                return true
        }
        return false;
    })
}

function readFileContentInSha256(dir) {
    let content;
    try {
        content = fs
            .readFileSync(dir)
            .toString();
    }catch (ex){
        content = UUID()
    }

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