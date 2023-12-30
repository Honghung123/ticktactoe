// Login - Register
function loginRegisterPage(req, res, next) {
  res.render("login_register");
} 
function homePage(req, res, next) {
  res.render("home");
}
function createPage(req, res, next) {
  res.render("create");
}
function rankPage(req, res, next) {
  res.render("rank");
}

module.exports = {
  // GET
  loginRegisterPage,
  homePage,
  createPage,
  rankPage,
};
