const _ = require('lodash');


let DataStore = require('../db');
let Folder = require('./folder');


function _enrichFileObject(list) {
    return _.forEach(list, function (file) {
        file.hash = Folder.readFileContentInSha256(file.dir);
    });
}

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