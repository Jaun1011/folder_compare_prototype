const fs = require('fs');
const _ = require('lodash');

const sha256 = require('sha256');
var DataStore = require('./db');

function _getFileList(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    filelist = filelist || [];
    _.forEach(files, function (file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        }
        else {
            filelist.push({dir: dir + '/' + file});
        }
    });
    return filelist;
}

function _enrichFileObject(list) {
    return _.forEach(list, function (file) {
        file.hash = _readFileContentSha256(file.dir);
    });
}

function _readFileContentSha256(dir) {
    var content = fs.readFileSync(dir).toString();
    return sha256(content);
}

function initFiles(dir) {
    var list = _getFileList(dir);
    list = _enrichFileObject(list);
    DataStore.insert(list);
}

function compare(dir) {
    var actualFiles = _getFileList(dir);
    DataStore.getDB().find({}, function (err, files) {
        actualFiles = _enrichFileObject(actualFiles);
        _.differenceBy(actualFiles, files, 'dir');
        console.log(_.differenceBy(actualFiles, files, 'hash'));
    });
}

module.exports = {
    initFiles: initFiles,
    compare: compare
};


