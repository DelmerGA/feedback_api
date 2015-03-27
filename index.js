require('dotenv').load();
var express = require('express');
var app = express();
var appMod  = require('./app');

appMod.setup(app);

app.listen(3000, function (){
  console.log("Up and running");
});
