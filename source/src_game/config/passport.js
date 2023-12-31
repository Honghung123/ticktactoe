const passport = require("passport");
const CustomStrategy = require("./strategy");
const flash = require("express-flash");
const Player = require("../model/player.m");

passport.serializeUser((user, done) => { 
  done(null, user);
});
passport.deserializeUser(async (username, done) => {
  // Retrieve the user from the database using the username 
  const player = await Player.getPlayerInfos(username);
  if (player != null) { 
    done(null, player);
  } else {
    done("Invalid user", null);
  }
});

const verifyCallback = async (username, done) => {
  if (username != null) {
    const player = await Player.getPlayerInfos(username);
    if (player != null) {
      return done(null, player.username);
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
