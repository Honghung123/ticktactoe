const passport = require("passport");
const CustomStrategy = require("./strategy");
const flash = require("express-flash");
const Player = require("../model/player.m");

passport.serializeUser((user, done) => {
  console.log("Call this serializeUser method");
  console.log(user);
  done(null, user);
});
passport.deserializeUser(async (username, done) => {
  // Retrieve the user from the database using the id
  const userObj = null;
  if (userObj != null) {
    done(null, userObj);
  }
});

const verifyCallback = async (username, done) => {
  if (username != null) {
    const player = await Player.getPlayerInfos(username);
    if (user != null) {
      return done(null, player);
    }
  }
  return done(null, false);
};

const customFields = {
  token: "token",
};

module.exports = (app) => {
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new CustomStrategy(verifyCallback, customFields));
};
