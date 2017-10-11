'use strict';

const _ = require('lodash');

let DataStore = require('../db');
let Folder = require('./folder');

function injectHoneyPod(files, dir, cadence) {
    let folders = Folder.getAllFolders(dir);
    console.log(folders);

    folders = _.sortBy(folders, [(folder) => {
        return folder.length;
    }]).filter((folder,index) => {
        return index % cadence == 0;
    });
    console.log(folders);
}

