const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('../app/controllers/users');

module.exports = (app) => {
  // passport.use(new LocalStrategy({
  //   usernameField: 'email',
  //   passwordField: 'password'
  // }, users.isUserExists));

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'anonaPrim0'
  }, users.isUserExistsByJwt));

  app.use(passport.initialize());
}