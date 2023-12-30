const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const saltRounds = 10; 

module.exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

module.exports.createToken = (object) => {
  return jwt.sign(object, process.env.SECRET_KEY);
};
module.exports.getUserFromToken = token => {
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    return user;
  } catch (err) {
    return null;
  }
};

module.exports.saveCookies = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

module.exports.clearAllProperty = (objectToClean) => {
  for (var x in objectToClean)
    if (objectToClean.hasOwnProperty(x)) delete objectToClean[x];
};
