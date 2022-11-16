const jwt = require("jsonwebtoken");

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const validToken = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  validToken,
  createJwt,
};
