'use strict';

let helper = require('mail/sendgrid').mail;
let fromEmail = new helper.Email('test@example.com');
let toEmail = new helper.Email('test@example.com');
let subject = 'Sending with SendGrid is Fun';
let content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
let mail = new helper.Mail(fromEmail, subject, toEmail, content);

let CONFIG = require('../res/config');


let sg = require('mail/sendgrid')(CONFIG.SENDGRID.API_KEY);


let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
        personalizations: [
            {
                to: [
                    {
                        email: 'jan.kuonen.93@gmail.com'
                    }
                ],
                subject: 'Sending with SendGrid is Fun'
            }
        ],
        from: {
            email: 'test@example.com'
        },
        content: [
            {
                type: 'text/plain',
                value: 'and easy to do anywhere, even with Node.js'
            }
        ]
    }
});

sg.API(request, function (error, response) {
    if (error) {
        console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
});