#!/usr/bin/env node
var mysql = require('mysql');

//Database
var TEST_DATABASE = 'nodetest';

//Tables
var USER_TABLE = 'storage_user';
var ACCOUNT_TABLE = 'account_table';
var CLOUD_TABLE = 'cloud_table';

//MySql Configuration
var client = mysql.createClient({
    host: 'localhost',
    user: 'root',
    password: 'aka@anand',
});

//Use Database
client.query('USE '+TEST_DATABASE);

//Create User Query
exports.CreateUser = function(username,emailid,password,activation,status,createddate){
    client.query(   
        'INSERT INTO '+USER_TABLE+' '+
        'SET username = ?, emailid = ?, password = ?, Activation = ?, status = ?, created_date = ?',
        [username,emailid,password,activation,status,createddate]
    );
    console.log("New User Rregistred");
    
}

exports.activateuser = function(email,code){
    client.query(
        'SELECT username FROM '+USER_TABLE+' '+
        'WHERE emailid = '+email+' & '+'Activation= '+code,
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }
            console.log(results);
            console.log(fields);
            client.end();
        }
    );
}