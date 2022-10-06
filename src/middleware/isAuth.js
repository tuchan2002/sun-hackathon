const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    throw err;
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      const err = new Error("Not authenticated.");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  req.userId = decodedToken.id;
  next();
};

module.exports = isAuth;
