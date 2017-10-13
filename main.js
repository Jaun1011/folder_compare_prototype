'use strict';

const _ = require('lodash');

const Honeypot = require('./src/honeypot/honeypot');

const CONFIG = require('./src/configreader').loadConfigFile('./res/conf/folder_config.json');

let DataStore = require('nedb');
let db = new DataStore(
    {
        filename:  './res/db/honeypot.db',
        autoload: true,
    }
);

let args = process.argv.slice(2);

function main(param) {
    switch(param){
        case '-i' || '--init':
            _.forEach(CONFIG.folders, (folder) => {
                let res = Honeypot.injectHoneyPod(folder);
                db.insert(res);
            });
            break;
        case '-r' || '--remove':
            db.find({}, function (err, res) {
                Honeypot.cleanUp(res, db)
            });
            break;
        case '-c' || '--compare':
            compare();
            break;
        case '-t' || '--time':
            setInterval(() => {
                compare();
            }, CONFIG.timeInterval);
            break;
    }
}
main(args[0]);

function compare() {
    db.find({}, function (err, files) {
        let report = Honeypot.compare(files);
        if (!_.isEqual(report , false)) {
            runBat(report);
        }
        console.log(report);
    });
}

function runBat(data) {
    require('child_process').exec(CONFIG.executeScript + " /u" + JSON.stringify(data), (err) =>{
        console.log(err);
    });
}
