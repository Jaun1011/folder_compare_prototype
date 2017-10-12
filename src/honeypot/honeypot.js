'use strict';

const _ = require('lodash');

let Folder = require('../folders/folder');
const INJECT_FILES = require('../configreader').loadConfigFile('./res/conf/folder_config.json');

function injectHoneyPod(dir) {
    let folders = Folder.getAllFolders(dir);

    let result = _.sortBy(folders, [(folder) => {
        return folder.length;
    }]).filter((folder, index) => {
        return index % INJECT_FILES.injectCadence == 0;
    }).map(_copyToFolder);

    return _cleanUpObject(result);
}

function _cleanUpObject(result) {
    let value= [];
    _.forEach(result, (wtf) => {
        value.push(wtf[0]);
    });
    return value;
}

function _copyToFolder(targetFolder) {
    let folders = [];
    let i = 0;

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

function compare(files) {
    let original = _.cloneDeep(files);

    _.forEach(files, (file) => {
        file.target.hash = Folder.readFileContentInSha256(file.target.path);
    });

    let result = {
        newDir: _.differenceBy(original, files, 'target.path'),
        existingDir: _.differenceBy(original, files, 'target.hash')
    };
    if (!_.isEqual(result.newDir, []) || !_.isEqual(result.existingDir, [])) {
        return result
    }
    return false;
}

module.exports = {
    injectHoneyPod: injectHoneyPod,
    compare: compare
};