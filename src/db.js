'use strict';

let Datastore = require('nedb');

function DB(source) {

   let db = new Datastore({
        filename: source,
        autoload: true
    });


    function insert(obj) {
        db.insert(obj, function (err, newDocs) {
            console.log(newDocs);
            if (err)
                console.log(err);
        });
    }

    function update(old, update) {
        db.update(old, update, {}, function (err) {
            console.log(err, newDocs);
        });
    }

    function getDB() {
        return db;
    }

    function removeDB() {
        db.remove({}, {multi: true}, function (err, numRemoved) {
            console.log(err, numRemoved);
        });
    }

    return {
        insert: insert,
        update: update,
        getDB: getDB,
        removeDB: removeDB
    }
}

module.exports = DB;