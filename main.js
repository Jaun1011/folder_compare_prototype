var FolderService = require('./src/folder.service');

//FolderService.initFiles('./res');


var args = process.argv.slice(2);
for (var i = 0; i < args.length; i++){
    options(args[i],args[i+1])
}

function options(param, value) {
    switch(param){
        case '-i':
            console.log(value);
            FolderService.initFiles(value);
            break;
        case '-c':
            interval(value, 1000 * 60 * 5);
            FolderService.compare(value);
            break;
    }
}

function interval(value, time) {
    setInterval(function () {
        FolderService.compare(value)
    }, time);
}