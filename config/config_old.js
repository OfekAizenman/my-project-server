const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // handle access
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });


  // handle logger
  app.use(logger('dev'));


  // handle json data
  app.use(bodyParser.json());


  // handle URL-encoded data
  app.use(bodyParser.urlencoded({
    extended: true
  }));


  // middleware that checks if JWT token exists and verifies it if it does exist.
  // In all the future routes, this helps to know if the request is authenticated or not.
  app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next();
    
    token = token.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Please Log in'
        });
      } else {
        req.user = user;
        next();
      }
    });
  });
};