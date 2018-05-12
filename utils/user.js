function validateSignUpForm(values, callback) {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;
  }

  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }

  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }

  const response = hasErrors && errors;
  return (callback) ? callback(response) : response;
}

function getCleanUser(user) {
  if (!user) return {};

  const userJson = user.toJSON();
  return {
    email: userJson.email,
  };

  // return {
  //   _id: u._id,
  //   name: u.name,
  //   username: u.username,
  //   email: u.email,
  //   admin: u.admin,
  //   createdAt: u.createdAt,
  //   updatedAt: u.updatedAt,
  //   image: u.image,
  //   isEmailVerified: u.isEmailVerified
  // }
}

module.exports = {
  getCleanUser,
  validateSignUpForm
}