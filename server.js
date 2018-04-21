const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');

const app = express();

const port = 8000;


const corsOptions = {
  origin: ['http://localhost:8080'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
});