var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    //port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '', // generated ethereal user
        pass: '' // generated ethereal password
    }
});
// izq6jr4ZQWSJEbM88f-G_w


transporter.sendMail(
    // e-mail options
    {
        sender: '',
        to:'',
        subject:'Hello!',
        html: '<p><b>Hi,</b> how are you doing?</p>',
        body:'Hi, how are you doing?'
    },
    // callback function
    function(error, success){
        console.log('Message ' + success);
        console.log('Message ' + error);
    }
);