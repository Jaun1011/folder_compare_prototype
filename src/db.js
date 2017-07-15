/**
 * Created by jan on 10.07.2017.
 */

var Datastore = require('nedb');
var db = new Datastore({
    filename: './res/initial.json',
    autoload: true
});

var DataStore = {
    insert: function (obj) {
        db.insert(obj, function (err, newDocs) {
            console.log(err, newDocs)
        });
    },

    update : function (old, update) {
        db.update(old, update, {}, function (err) {

            console.log(err, newDocs)
        });
    },

    find : function () {
        db.find( function (err) {
            console.log(err, newDocs)
        });
    }


};
module.exports = DataStore;