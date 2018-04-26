const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:8080'],
    credentials: true,
};

module.exports = (app) => {
    // handle json data
    app.use(bodyParser.json());

    // handle URL-encoded data
    app.use(bodyParser.urlencoded({ extended: true }));

    // handle origin
    app.use(cors(corsOptions));
};