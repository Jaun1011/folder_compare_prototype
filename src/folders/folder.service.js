'use strict';

const _ = require('lodash');

let DataStore = require('../db')('./res/db/initial.json');
let Folder = require('./folder');

function _enrichFileObject(list) {
    return _.forEach(list, function (file) {
        file.hash = Folder.readFileContentInSha256(file.dir);
    });
}

/**
 * init folders without filename
 * @param dir
 */
function initFiles(dir) {
    let files = Folder.readAllFilesWithSubFolders(dir);
    files = _enrichFileObject(files);
    DataStore.insert(files);
}

/**
 * compares all files in the given dir
 * @param dir
 */
function compare(dir) {
    let actualFiles = Folder.readAllFilesWithSubFolders(dir);

    return DataStore.getDB().find({}, function (err, files) {
        actualFiles = _enrichFileObject(actualFiles);
        let result =  {
            newDir : _.differenceBy(actualFiles, files, 'dir'),
            existingDir: _.differenceBy(actualFiles, files, 'hash')
        };
        if(!_.isEqual(result.newDir, []) || !_.isEqual(result.existingDir, [])){
            console.log("sendmail");
        }
    });
}

module.exports = {
    initFiles: initFiles,
    compare: compare,
    injectHoneyPod:injectHoneyPod
};