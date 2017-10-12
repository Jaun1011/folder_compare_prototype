'use strict';


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
            let res = Honeypot.injectHoneyPod(CONFIG.folders[0])
            db.insert(res);
            break;
        case '-c' || '--compare':
            db.find({}, function (err, res) {
                console.log(Honeypot.compare(res));
            });
            break;
        case '-t' || '--time':
            Controller.interval();
            break;
    }
}
main(args[0]);
