'use strict';

const _ = require('lodash');

let DataStore = require('../db')('./res/db/honeypot.json');
let Folder = require('../folders/folder');

let INJECT_FILES = require('../configreader')
    .loadConfigFile('./res/conf/folder_config.json');

function injectHoneyPod(dir) {
    let folders = Folder.getAllFolders(dir);
    let injectedFiles = _.sortBy(folders, [(folder) => {
        return folder.length;
    }]).filter((folder, index) => {
        return index % INJECT_FILES.injectCadence == 0;
    }).map(_copyToFolder);

    DataStore.insert(injectedFiles);
}

function _copyToFolder(targetFolder) {
    let folders = [];
    _.forEach(INJECT_FILES.injectDirectories, (injectdir) => {
        folders = _.map(injectdir.files, (file) => {
            let targetPath = targetFolder + "\\" + file;
            Folder.copy(injectdir.dir + file, targetPath);
            return {
                source: {
                    dir: injectdir.dir,
                    file: file
                },
                target: {
                    dir: targetFolder,
                    file: file,
                    hash: Folder.readFileContentInSha256(targetPath)
                }
            };
        })
    });
    return folders;
}

module.exports = {
    injectHoneyPod: injectHoneyPod
};