const Player = require("../model/player.m");

// Login - Register
function loginRegisterPage(req, res, next) {
  res.render("login_register");
}  
function homePage(req, res, next) {
  res.render("home", {
    navId: 1
  });
}
function createPage(req, res, next) {
  res.render("create", {
    navId: 2,
  });
}
function rankPage(req, res, next) {
  res.render("rank", {
    navId: 3,
  });
}
async function logOut(req, res, next) {
  if (req.session.hasOwnProperty("passport")) { 
    if (req.session.passport.hasOwnProperty("user")) {
      const username = req.session.passport.user;
      await Player.removePlayerFromOnlineList(username);
    }
  }

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}

module.exports = {
  // GET
  loginRegisterPage, 
  homePage,
  createPage,
  rankPage,
  logOut,
};
