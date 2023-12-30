// Login - Register
function loginRegisterPage(req, res, next) {
  res.render("login_register");
} 
function homePage(req, res, next) {
  res.render("home");
}

module.exports = {
  // GET
  loginRegisterPage,
  homePage,
};
