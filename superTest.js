// var request = require('supertest')
//   , express = require('express');

// var app = express();

// app.get('/user', function(req, res){
//   res.send(200, { name: 'tobi' });
// });

// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '20')
//   .expect(200)
//   .end(function(err, res){
//     if (err) throw err;
//   });

// read physical adrss from the command line
var sys = require("sys");

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");
  });

//add listener with the type sys library
