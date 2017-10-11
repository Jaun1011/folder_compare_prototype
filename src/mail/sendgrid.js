var helper = require('mail/sendgrid').mail;
var fromEmail = new helper.Email('test@example.com');
var toEmail = new helper.Email('test@example.com');
var subject = 'Sending with SendGrid is Fun';
var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
var mail = new helper.Mail(fromEmail, subject, toEmail, content);

var CONFIG = require('../res/config');


var sg = require('mail/sendgrid')(CONFIG.SENDGRID.API_KEY);


var request = sg.emptyRequest({
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