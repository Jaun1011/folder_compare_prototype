'use strict';

const _ = require('lodash');
const fs = require('fs');
const fse = require('fs-extra');
const Filehound = require('filehound');
const sha256 = require('sha256');
const UUID = require('uuid/v4');
const path = require('path');
const CONFIG = require('../configreader').loadConfigFile('./res/conf/folder_config.json');


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
        .findSync()
        .map(folder => folder.replace(/\\/g, '/') + '/')
        .push(path);
}


function flatten(lists) {
    return lists.reduce(function (a, b) {
        return a.concat(b);
    }, []);
}

function getDirectories(srcpath) {
    let paths = fs
        .readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .map(path => path.replace(/\\/g, '/') + '/')
        .filter(path => fs.statSync(path).isDirectory());
    return excludePaths(paths, CONFIG.excludedFolders);
}

function excludePaths(paths, excludedFolders) {
    if (excludedFolders.length > 0) {
        return _.filter(paths, (path) => {
            let result = true;
            for (let i = 0; i < excludedFolders.length; i++) {
                let excludedFolder = excludedFolders[i];
                let re = new RegExp(excludedFolder + ".*", "g");
                result = path.match(re) || _.isEqual(excludedFolder, path);

                if (result) {
                    break;
                }
            }
            return !result;
        });
    }
    return paths;
}


function readAllFoldersFs(srcpath) {
    return [srcpath, ...flatten(getDirectories(srcpath).map(readAllFoldersFs))];
}

function removeFolders(target, folders) {
    return _.remove(target, (item) => {
        for (let i = 0; i < folders.length; i++) {
            if (item.match(folders[i]))
                return true;
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
    } catch (ex) {
        content = UUID();
    }
    return sha256(content);
}

function copy(filepath, target) {
    fse.copySync(filepath, target);
}

function remove(filepath) {
    fs.exists(filepath, function (exists) {
        if (exists) {
            fs.unlink(filepath);
        }
    });
}

module.exports = {
    readAllFilesWithSubFolders: readAllFilesWithSubFolders,
    readFileContentInSha256: readFileContentInSha256,
    getAllFolders: getAllFolders,
    copy: copy,
    remove: remove,
    readAllFoldersFs: readAllFoldersFs,
    excludePaths: excludePaths
};