const passport = require("passport");

// Login - Register
function loginRegisterPage(req, res, next) {
  res.render("login_register");
}

function authorizeToken() { 
  passport.authenticate("custom-strategy", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
    (req, res) => {
      res.redirect("/login");
    };
}

module.exports = {
  loginRegisterPage,
  authorizeToken,
};
