const passport = require("passport");
const User = require("../model/game.m");
const MyStrategy = require("./strategy"); 
const bcrypt = require("bcrypt");
const flash = require("express-flash");

passport.serializeUser((user, done) => {
  done(null, user.Username);
});
passport.deserializeUser(async (username, done) => {
  // Retrieve the user from the database using the id
  const userObj = null;
  if (userObj != null) {
    done(null, userObj);
  }
});

const verifyCallback = async (username, password, done) => {
  // const user = await User.getUserInfos(username);
  const user = {password : "123"}
  if (user != null) {
    const match = await bcrypt.compare(password, user.Password);
    if (match) {
      return done(null, user);
    }
  }
  return done(null, false);
};

const customFields = {
  username: "username",
  password: "password",
};

module.exports = (app) => {
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new MyStrategy(verifyCallback, customFields)); 
};
