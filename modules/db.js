#!/usr/bin/env node
var mysql = require('mysql');

//Database
var TEST_DATABASE = 'nodetest';

//Tables
var USER_TABLE = 'user_table';
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
exports.CreateUser = function(username,emailid,password,status,createddate){
    client.query(   
        'INSERT INTO '+USER_TABLE+' '+
        'SET username = ?, emailid = ?, password = ?, status = ?, created_date = ?',
        [username,emailid,password,status,createddate]
    );
    console.log("hello");
    
}