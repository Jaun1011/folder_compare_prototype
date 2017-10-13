'use strict';

const _ = require('lodash');

let Folder = require('../folders/folder');
const INJECT_FILES = require('../configreader').loadConfigFile('./res/conf/folder_config.json');

function injectHoneyPod(dir) {

    let folders = Folder.getAllFolders(dir);

    let res = _.sortBy(folders, [(folder) => {
        return folder.length;
    }]).filter((folder, index) => {
        return index % INJECT_FILES.injectCadence == 0;
    });

    let sortedFolders = [];
    _.forEach(res ,(dir) => {
        sortedFolders.push(_copyToFolder(dir));
    });
    return sortedFolders[0];
}

function cleanUp(dir, db) {
    _.forEach(dir, (file) => {
        Folder.remove(file.target.path);
        db.remove(file);
    })
}

function _copyToFolder(targetFolder) {
    let folders = [];

    _.forEach(INJECT_FILES.injectDirectories, (injectdir) => {
        _.forEach(injectdir.files, (file) => {
            let targetPath = targetFolder + "\\" + file;
            Folder.copy(injectdir.dir + file, targetPath);
            folders.push({
                date: Date.now(),
                source: {
                    path: injectdir.dir + file,
                    dir: injectdir.dir,
                    file: file
                },
                target: {
                    path: targetPath,
                    dir: targetFolder,
                    file: file,
                    hash: Folder.readFileContentInSha256(targetPath)
                }
            });
        });
    });
    return folders;
}

function _convertNewFileObjectForDiff(files) {
    return _.map(files, (file) => {
        file.hash = Folder.readFileContentInSha256(file.target.path);
        file.path = file.target.path;
        return file;
    });
}

function _convertOldFileObjectForDiff(files) {
    return _.map(files, (file) => {
        file.hash = file.target.hash;
        file.path = file.target.path;
        return file;
    });
}

function _compareHash(oldvalue, newvalue) {
    let diff = [];
    for (let i = 0; i < oldvalue.length; i++) {
        if (oldvalue[i].hash !== newvalue[i].hash) {
            diff.push(newvalue[i]);
        }
    }
    return diff;
}

function compare(files) {
    let original = _.cloneDeep(files);

    let oldFiled = _convertOldFileObjectForDiff(original);
    let newFiles = _convertNewFileObjectForDiff(files);
    let result = _compareHash(oldFiled, newFiles);

    if (_.isEqual(result, [])) {
        return false;
    }
    return result
}

module.exports = {
    injectHoneyPod: injectHoneyPod,
    compare: compare,
    cleanUp: cleanUp
};