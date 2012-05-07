var mail = require('nodemailer');

// one time action to set up SMTP information
mail.SMTP = {
    host: 'smtp.gmail.com',
    port: 465,
    use_authentication: true,
    ssl: true,
    user: 'arrlostnfound@gmail.com',
    pass: 'grindfun&&',
    debug: true
}

//Mail Sender Method
exports.sendmail = function (sendermail,tomail,subject,content) {
    mail.send_mail({
        sender: sendermail,
        to: tomail,
        subject:subject,
        html: content},function(error, success){
        console.log('Message ' + success ? 'sent' : 'failed');
    });
};

