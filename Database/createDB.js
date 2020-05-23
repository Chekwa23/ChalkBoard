//James Gossling
//3/25/2020

//setup connection
var mysql = require('mysql');
var conn = mysql.createConnection(
{
    //use this for local creation
    host: "localhost",
    //use this for remote creation
    //replace ### with your server number
    //host: "coms-309-###.cs.iastate.edu:"
    user: "root",
    //replace password with your root password
    password: "comsVM@319"
    //password: "password"
});

//create connection
conn.connect(
    function(err)
    {
        //throw error if can't connect
        if (err)
            throw err;
        //else connected
        console.log("Connected");
        //
        //create a database
        //
        conn.query("CREATE DATABASE Chalkboard",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard Database created");
        });
        conn.query("Use Chalkboard",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Switched to Chalkboard");
        });
        //
        //create tables
        //
        //create user
        conn.query("create table users(lname varchar(255), fname varchar(255), role varchar(255), email varchar(255), username varchar(255) primary key, password varchar(255) )",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard table user created");
        });
        //create class
        conn.query("create table classes( code varchar(100) primary key, name varchar(255), description varchar(512), total int)",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard table class created");
        });
        //create enrolled
        conn.query("create table enrolled( username varchar(255), code varchar(100), gradepoint int, primary key(username,code), foreign key (username) references users (username), foreign key (code) references classes (code) )",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard table enrolled created");
        });
        //create announcements
        conn.query("create table announcements( code varchar(100), anid int primary key, description varchar(500), foreign key (code) references classes (code) )",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard table announcements created");
        });
        //create assignments
        conn.query("create table assignments( code varchar(100), asid int primary key, description varchar(500), foreign key (code) references classes (code) )",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard table assignments created");
        });
        //create notes
        conn.query("create table notes( code varchar(100), nid int primary key, name varchar(100), link varchar(500), foreign key (code) references classes (code) )",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard table notes created");
        });
        //
        //insert records
        //
        //users student
        conn.query("insert into users (lname,fname,role,email,username,password) values ('Gossling','James','student','jgos@iastate.edu','jgos', '123')",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard user inserted");
        });
        conn.query("insert into users (lname,fname,role,email,username,password) values ('Gudenkauf','Jake','student','jakegude@iastate.edu','jgude', '123')",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard user inserted");
        });
        conn.query("insert into users (lname,fname,role,email,username,password) values ('Onwuchekwa','Lucas','student','lucaso@iastate.edu','lucaso', '123')",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard user inserted");
        });
        conn.query("insert into users (lname,fname,role,email,username,password) values ('Norizan','Muhammad','student','mkhairi@iastate.edu','mkhairi', '123')",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard user inserted");
        });
        //users instructor
        conn.query("insert into users (lname,fname,role,email,username,password) values ('Doe','Jane','instructor','jgos@iastate.edu','jdoe', '123')",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard user inserted");
        });
        conn.query("insert into users (lname,fname,role,email,username,password) values ('Smith','John','instructor','jgos@iastate.edu','sjohn', '123')",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard user inserted");
        });
        //classes
        conn.query("insert into classes (code,name,description,total) values ('SE319','UI Design','A 300 level course on building User Interfaces.',100)",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard class inserted");
        });
        conn.query("insert into classes (code,name,description,total) values ('CS363','Database Design','A 300 level course on building Databases.',100)",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard class inserted");
        });
        conn.query("insert into classes (code,name,description,total) values ('CS230','Algorithms','A 200 level course on computational algorithms and runtime analysis.',100)",
        function(err,result)
        {
            if (err)
                throw err;
            console.log("Chalkboard class inserted");
        });
     conn.query("insert into classes (code,name,description,total) values ('MATH165','Calc I','A 100 level course on simple calculus.',100)",
     function(err,result)
     {
         if (err)
             throw err;
         console.log("Chalkboard class inserted");
     });
     conn.query("insert into classes (code,name,description,total) values ('CS309','Project Design','A 300 level course on creating a group software project.',100)",
     function(err,result)
     {
         if (err)
             throw err;
         console.log("Chalkboard class inserted");
     });
     conn.query("insert into classes (code,name,description,total) values ('ENG250','English II','A 200 level course on Literature and Writing.',100)",
     function(err,result)
     {
         if (err)
             throw err;
         console.log("Chalkboard class inserted");
     });

        console.log("Chalkboard database created and populated");
        conn.end();
    });
