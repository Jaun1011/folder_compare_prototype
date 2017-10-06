const _ = require('lodash');

const walkSync = require('walk-sync');
const fs = require('fs');
const sha256 = require('sha256');


function readAllFilesWithSubFolders(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    filelist = filelist || [];
    _.forEach(files, function (file) {
        var path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            filelist = walkSync(path, filelist);
        } else {
            filelist.push({dir: path});
        }
    });
    return filelist;
}

function readFileContentInSha256(dir) {
    var content = fs.readFileSync(dir).toString();
    return sha256(content);
}

module.exports = {
    readAllFilesWithSubFolders: readAllFilesWithSubFolders,
    readFileContentInSha256: readFileContentInSha256
};