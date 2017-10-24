'use strict';

const _ = require('lodash');

let Folder = require('../folders/folder');
const CONFIG = require('../configreader').loadConfigFile('./res/conf/folder_config.json');

let log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = CONFIG.logLevel;

function injectHoneyPod(dir) {
    logger.info("honeypot file inject: started with dir ->", dir);

    let folders  = Folder.readAllFoldersFs(dir);
    let res = _.sortBy(folders, [(folder) => {
        return folder.length;
    }]).filter((folder, index) => {
        return (index + 1) % CONFIG.injectCadence == 0;
    });

    let sortedFolders = [];
    _.forEach(res ,(dir) => {
        sortedFolders.push(_copyToFolder(dir));
    });

    logger.debug("honeypot: inject files ->", sortedFolders);
    logger.info("honeypot file inject: finished");
    return mergeFolderArray(sortedFolders);
}

function mergeFolderArray(folderArray) {
    let result = [];
    _.forEach(folderArray , (folder) => {
       _.forEach(folder, (item) => {
           logger.debug("honeypot: folder add to honeypot -> " , item);
           result.push(item);
       });
    });
    return result;
}

function cleanUp(dir, db) {
    logger.info("clean up: started");
    _.forEach(dir, (file) => {
        Folder.remove(file.target.path);
        logger.debug("honeypot: file removed -> " , file);

        db.remove(file);
    });
    logger.info("clean up: finished");
}

function _copyToFolder(targetFolder) {
    let folders = [];
    logger.debug("honeypot: copy file start on folder -> " , targetFolder);

    _.forEach(CONFIG.injectDirectories, (injectdir) => {
        _.forEach(injectdir.files, (file) => {
            let targetPath = targetFolder  + file;
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
    logger.debug("honeypot: copy file finished with result ->" , folders);
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
        logger.debug("honeypot: compare hash -> oldvalue => " , oldvalue[i], "newvalue => ",newvalue[i]);
        logger.debug("honeypot: operation -> " , oldvalue[i].hash !== newvalue[i].hash);
        if (oldvalue[i].hash !== newvalue[i].hash) {
            diff.push(newvalue[i]);
        }
    }
    return diff;
}

function compare(files) {
    logger.info("compare: started");

    let original = _.cloneDeep(files);

    let oldFiled = _convertOldFileObjectForDiff(original);
    let newFiles = _convertNewFileObjectForDiff(files);
    let result = _compareHash(oldFiled, newFiles);

    logger.info("compare: finished -> ", JSON.stringify(result));

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