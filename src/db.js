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

    getDB : function () {
        return db;
    },

   removeDB: function () {
       db.remove({}, { multi: true }, function (err, numRemoved) {
           console.log(err, numRemoved)
       });
   }
};
module.exports = DataStore;