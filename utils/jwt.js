const jwt = require('jsonwebtoken');

exports.generateToken = function (user) {
  var u = {
    name: user.name,
    username: user.username,
    admin: user.admin,
    _id: user._id.toString(),
    image: user.image,
    isEmailVerified: user.isEmailVerified //used to prevent creating posts w/o verifying emails
  };

  return token = jwt.sign(u, 'anonaPrim0', {
    expiresIn: 60 * 60 * 24 * 7 // expires in 1 week
  });
}