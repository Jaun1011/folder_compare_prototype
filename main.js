'use strict';

const fs = require('fs');
const _ = require('lodash');

let env = require('node-env-file');
let args = process.argv.slice(2);


let FOLDER_CONFIG = loadConfigFile('./res/conf/folder_config.json');


let FolderService = require('./src/folders/folder.service');

main(args[0]);
function main(param) {
    switch(param){
        case '-i' || '--init':
            _.forEach(FOLDER_CONFIG.folders, function (folder) {
                FolderService.initFiles(folder);
            });
            break;
        case '-c' || '--compare':
            compare(FOLDER_CONFIG.folders);
            break;

        case '-t' || '--time':
            interval(FOLDER_CONFIG.folders, FOLDER_CONFIG.timeInterval);
            break;
    }
}

function compare(folders) {
    _.forEach(folders,function(folder){
        FolderService.compare(folder);
    });
}

function interval(folders, time) {
    setInterval(function () {
       compare(folders);
    }, time);
}


/**
 * JSON files cant be loaded over the require way.
 * You have to load it over fs..
 * @param path
 */
function loadConfigFile(path) {
    var config = fs.readFileSync(path).toString();
    return JSON.parse(config);
}