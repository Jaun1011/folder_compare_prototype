'use strict';

let nodemailer = require('nodemailer');
let sgTransport = require('nodemailer-sendgrid-transport');
let CONFIG = require('../res/config');

let client = nodemailer.createTransport(sgTransport({
    auth: {
        //api_user: CONFIG.SENDGRID.API_USER,
        api_key: CONFIG.SENDGRID.API_KEY
    }
}));

function send(context) {
    let email = {
        from: 'info@folderscanner.int',
        to: ['jan.kuonen.93@gmail.com'],
        subject: 'INFO Folderreport',
        text: 'Suspectious Folder',
        html: context
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