var express = require('express');
var db = require('./modules/db');
var mail = require('./modules/mailer');
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

app.post('/addme', function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = MD5(req.body.password);
    var status = 0;
    var createddate = new Date();
    console.log(username);
    db.CreateUser(username,email,password,status,createddate);
});


app.listen(3000);

console.log("Node Server running at http://127.0.0.1:3000");