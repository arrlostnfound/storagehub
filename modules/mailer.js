var nodemailer = require('nodemailer');

nodemailer.SMTP = {
    host: 'smtp.gmail.com',
    port: 465,
    use_authentication: true,
    ssl: true,
    user: 'anandchitravelu@gmail.com',
    pass: 'bookklix@)!@',
    debug: true
}

exports.mailme = function(sender,to,subject,html,body){
    nodemailer.send_mail({
        sender: sender,
        to: to,
        subject:subject,
        html: html,
        body:body
    },function(error, success){
        console.log('Message ' + success ? 'sent' : 'failed');
    });
}

