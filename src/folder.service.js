const fs = require('fs');
const _ = require('lodash');

var walkSync = require('walk-sync');
const sha256 = require('sha256');
var DataStore = require('./db');

var path = require('path');



// Windows?
var win32 = 'win32';
// Normalize \\ paths to / paths.
function unixifyPath(filepath) {
    if (win32) {
        return filepath.replace(/\\/g, '/');
    } else {
        return filepath;
    }
}

// Recurse into a directory, executing callback for each file.
function walk(rootdir, callback, subdir) {
    var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
    fs.readdirSync(abspath).forEach(function(filename) {
        var filepath = path.join(abspath, filename);
        if (fs.statSync(filepath).isDirectory()) {
            walk(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
        } else {
            callback(unixifyPath(filepath), rootdir, subdir, filename);
        }
    });
}

function _prepareFolders(dir) {
    var list = [];
    walk(dir, function(filepath, rootdir, subdir, filename) {
        list.push({dir: filepath})
    });
    return list
}

function _enrichFileObject(list) {
    //var datetime = require('node-datetime');

    return _.forEach(list, function (file) {
        file.hash = _readFileContentSha256(file.dir);
      //  file.date = datetime.now();

    });
}

function _readFileContentSha256(dir) {
    var content = fs.readFileSync(dir).toString();
    return sha256(content);
}

function initFiles(dir) {
    DataStore.removeDB();
    var list = _prepareFolders(dir);

    console.log(list);
    var result = _enrichFileObject(list);
    DataStore.insert(result);
}

function compare(dir) {
    var actualFiles = _prepareFolders(dir);

    return DataStore.getDB().find({}, function (err, files) {
        actualFiles = _enrichFileObject(actualFiles);
        var result =  {
            newDir : _.differenceBy(actualFiles, files, 'dir'),
            existingDir: _.differenceBy(actualFiles, files, 'hash')
        };


        console.log(result);
        if(!_.isEqual(result.newDir, []) || !_.isEqual(result.existingDir, [])){
            console.log("sendmail");
        }
    });
}

module.exports = {
    initFiles: initFiles,
    compare: compare
};


