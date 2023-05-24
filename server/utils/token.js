const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const secret = "my-secret-key";
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

module.exports = { generateToken };