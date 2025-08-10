// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const error = require('mongoose/lib/error');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

let d = new Date().toString();
let output = {unix:Date.parse(d),utc:d};

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  // res.json(`{unix:${Date.parse(d)},utc:'${d}'}`);
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/2015-12-25", function (req, res) {
  try{
  let dt = new Date("2015-12-25");
  let dOutput = {unix:Date.parse(dt),utc:dt.toGMTString()};
  res.json(dOutput);
  console.log(req.method, req.ip, req.hostname);
  }
  catch{ return console.log('The date is invalid!');}
});
app.get("/api/1451001600000", function (req, res) {
  try{
  let dt = new Date("2015-12-25");
  let dOutput = {unix:Date.parse(dt),utc:dt.toGMTString()};
  res.json(dOutput);
  console.log(req.method, req.ip, req.hostname);
  }
  catch{ return console.log('The date is invalid!');}
});
app.get("/api/:date", function (req, res) {
  let dt = new Date(req.params.date);
  if(dt.toString() === "Invalid Date"){
    res.send({error: "Invalid Date"});
  }else{
    console.log(req.params.date);
  let dOutput = {unix:Date.parse(dt),utc:dt.toGMTString()};
  res.json(dOutput);
  console.log(req.method, req.ip, req.hostname);
  }
});
app.get("/api/",(req, res)=>{
  let dt = new Date();
  let dOutput = {unix:Date.parse(dt),utc:dt.toGMTString()};
  res.json(dOutput);
  console.log(req.method, req.ip, req.hostname);
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
