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
function logOut(req, res, next) {
  res.render("rank");
}

module.exports = {
  // GET
  loginRegisterPage, 
  homePage,
  createPage,
  rankPage,
  logOut,
};
