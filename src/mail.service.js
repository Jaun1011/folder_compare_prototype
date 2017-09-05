var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var CONFIG = require('../res/config');

var client = nodemailer.createTransport(sgTransport({
    auth: {
        //api_user: CONFIG.SENDGRID.API_USER,
        api_key: CONFIG.SENDGRID.API_KEY
    }
}));

function send(context) {
    var email = {
        from: 'info@folderscanner.int',
        to: ['jan.kuonen.93@gmail.com'],
        subject: 'INFO Folderreport',
        text: 'Suspectious Folder',
        html: JSON.stringify(context)
    };

    client.sendMail(email, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports = {
    send: send
};


