var FolderService = require('./src/folder.service');


var _ = require('lodash');
var CONFIG = require('./res/config.js');
var args = process.argv.slice(2);


options(args[0]);

function options(param) {
    switch(param){
        case '-i' || '--init':
            _.forEach(CONFIG.FOLDERS,function (folder) {
                FolderService.initFiles(folder);
            });
            break;
        case '-c' || '--compare':
            compare(CONFIG.FOLDERS);
            break;

        case '-t' || '--time':
            interval(CONFIG.FOLDERS, CONFIG.TIME_INTERVAL);
            break;
    }
}

function compare(folders) {
    _.forEach(folders,function(folder){
        FolderService.compare(folder)
    });
}

function interval(folders, time) {
    setInterval(function () {
       compare(folders)
    }, time);
}