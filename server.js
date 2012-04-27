var express = require('express');
var db = require('./modules/db');
var mail = require('./modules/mailer');
var random = require('./modules/random');
var mypassword = random.random();

var Hashes = require('jshashes');
var fs = require('fs');
var serverlog = fs.createWriteStream('./server.log', {flags: 'a'});
var MD5 = new Hashes.MD5;

var app = express.createServer();

app.configure(function(){
    app.set("view engine", "html");
    app.register(".html", require("jqtpl").express);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use({ src: __dirname + '/public' });
    app.use(express.logger({stream: serverlog}));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req,res){
    res.render('index');
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/register', function(req,res){
    res.render('register');
});

app.get('/confirmation', function(req,res){
    res.render('confirm');
});

app.post('/addme', function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = MD5.hex(req.body.password);
    var status = 0;
    var createddate = new Date();
    var activation = random.random();
    db.CreateUser(username,email,password,activation,status,createddate);
    var content  = 'http://10.10.27.18:3000/confirmation and activation code is : ' +activation;
    mail.sendmail("ramanand.chitravelu@csscorp.com",email,'Activation',content);
    res.render('confirmemail');
});

app.post('/confirmme', function(req,res){
    var email = req.body.email;
    var code = req.body.code;
    db.ActivateUser(email,code);
    res.render('success');
    //mail.sendmail("ramanand.chitravelu@csscorp.com",email,'Activation',activation);
});


app.listen(3000);

console.log("Node Server running at http://127.0.0.1:3000");