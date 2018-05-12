'use strict';

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');

const app = express();


// Environments
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./config/env')[env];


// Register models
const models = join(envConfig.rootPath, 'app/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));


// Express configuration & Error handling
require('./config/config')(app);
require('./config/errorHandling')(app);


// Handle passport
require('./utils/passport')(app);


// Routes
require('./app/routes')(app);


// Mongo Connection
mongoose.connect(envConfig.database).then(
  () => listen(),
  err => console.log(err)
);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(envConfig.port);
  console.log('Express app started on port ' + envConfig.port);
}