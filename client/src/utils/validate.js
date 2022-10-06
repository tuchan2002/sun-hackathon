export const validateRegister = ({
  displayName,
  email,
  password,
  confirm_password,
}) => {
  const err = {};

  if (!displayName) {
    err.displayName = "Please add your display name.";
  } else if (displayName.length > 20) {
    err.displayName = "Full name is up to 20 characters long.";
  }

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

export const validateSetNewPassword = ({
  newPassword,
  confirm_newPassword,
}) => {
  const err = {};

  if (!newPassword) {
    err.newPassword = "Please add your password.";
  } else if (newPassword.length < 6) {
    err.newPassword = "Password must be at least 6 characters.";
  }

  if (newPassword !== confirm_newPassword) {
    err.confirm_newPassword = "Confirm password did not match.";
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
