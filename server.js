// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;

// const app = express();

// // Environments
// var env = process.env.NODE_ENV || 'development';
// var envConfig = require('./config/env')[env];

// // Express configuration
// require('./config/config')(app);

// // Routes
// //require('./app/routes')(app);

// MongoClient.connect(envConfig.database, (err, database) => {
//   if (err) return console.log(err)
  
//   require('./app/routes')(app, database);

//   app.listen(envConfig.port, () => {
//     console.log('We are live on ' + envConfig.port);
//   });               
// });

'use strict';

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const app = express();


// Environments
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./config/env')[env];


// Register models
const models = join(envConfig.rootPath, 'app/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));


// Express configuration
require('./config/config')(app);


// Routes
require('./app/routes')(app);


mongoose.connect(envConfig.database).then(
  () => listen(),
  err => console.log(err)
);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(envConfig.port);
  console.log('Express app started on port ' + envConfig.port);
}