export const validateRegister = ({ email, password, confirm_password }) => {
  const err = {};

  if (!email) {
    err.email = "Please add your email.";
  } else if (!validateEmail(email)) {
    err.email = "Email format is incorrect.";
  }

  if (!password) {
    err.password = "Please add your password.";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 characters.";
  }

  if (password !== confirm_password) {
    err.confirm_password = "Confirm password did not match.";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}
