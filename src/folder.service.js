const fs = require('fs');
const _ = require('lodash');

const sha256 = require('sha256');
var DataStore = require('./db');

function _getFileList(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    filelist = filelist || [];
    _.forEach(files, function (file) {
        var path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            filelist = walkSync(path, filelist);
        }else {
            filelist.push({dir: path});
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

    return DataStore.getDB().find({}, function (err, files) {
        actualFiles = _enrichFileObject(actualFiles);
        var result =  {
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
    compare: compare
};


