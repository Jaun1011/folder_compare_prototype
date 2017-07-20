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

function _readFileContentSha256(dir) {
    var content = fs.readFileSync(dir).toString();
    return sha256(content);
}

function initFiles(dir) {
    var list = _getFileList(dir);
    _.forEach(list, function (file) {
        file.hash = _readFileContentSha256(file.dir);
    });
    DataStore.insert(list);
}

function compare(dir) {
// compare existing folders

    var actualFiles = _getFileList(dir);

    DataStore.getDB().find({}, function (err, files) {
        if(_compareArrayProperty(files,actualFiles,'dir')){
            console.log(files);
            _readFileContentSha256()
            _compareArrayProperty(files, actualFiles, 'hash')
        }else{
            // check which file is new
        }
    });
}

function _compareArrayProperty(initial, actual, prop) {
    function _getProperty(value) {
        return _.map(value, prop).sort()
    }

    return _.isEqual(
        _getProperty(initial),
        _getProperty(actual));
}

module.exports = {
    initFiles: initFiles,
    compare: compare
};


