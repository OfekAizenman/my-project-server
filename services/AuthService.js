const User = require('./../models').User;
const validator = require('validator');

// This is so they can send in 3 options unique_key, email, or phone and it will work
const getUniqueKeyFromBody = function (body) {
  const unique_key = (typeof body.unique_key !== 'undefined') ? 
    body.unique_key : (typeof body.email != 'undefined') ? 
    body.email : (typeof body.phone != 'undefined') ? 
    body.phone : null;

  return unique_key;
}

module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function (userInfo) {
  let unique_key, auth_info, err;

  auth_info = {}
  auth_info.status = 'create';

  unique_key = getUniqueKeyFromBody(userInfo);
  if (!unique_key) TE('An email or phone number was not entered.');

  if (validator.isEmail(unique_key)) {
    auth_info.method = 'email';
    userInfo.email = unique_key;

    [err, user] = await to(User.create(userInfo));
    if (err) TE('user already exists with that email');

    return user;

  } else if (validator.isMobilePhone(unique_key, 'any')) { //checks if only phone number was sent
    auth_info.method = 'phone';
    userInfo.phone = unique_key;

    [err, user] = await to(User.create(userInfo));
    if (err) TE('user already exists with that phone number');

    return user;
  } else {
    TE('A valid email or phone number was not entered.');
  }
}
module.exports.createUser = createUser;

// Returns token
const authUser = async function (userInfo) {
  let unique_key;
  let auth_info = {};
  auth_info.status = 'login';
  unique_key = getUniqueKeyFromBody(userInfo);

  if (!unique_key) TE('Please enter an email or phone number to login');
  if (!userInfo.password) TE('Please enter a password to login');

  let user;
  if (validator.isEmail(unique_key)) {
    auth_info.method = 'email';

    [err, user] = await to(User.findOne({
      email: unique_key
    }));
    if (err) TE(err.message);

  } else if (validator.isMobilePhone(unique_key, 'any')) { //checks if only phone number was sent
    auth_info.method = 'phone';

    [err, user] = await to(User.findOne({
      phone: unique_key
    }));
    if (err) TE(err.message);

  } else {
    TE('A valid email or phone number was not entered');
  }

  if (!user) TE('Not registered');

  [err, user] = await to(user.comparePassword(userInfo.password));

  if (err) TE(err.message);

  return user;
}
module.exports.authUser = authUser;