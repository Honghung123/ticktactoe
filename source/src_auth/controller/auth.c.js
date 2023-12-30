
// Login - Register
function getLoginPage(req, res, next) {
    res.render("login");
}

async function getRegisterPage(req, res, next) {
    res.render("register");
}
async function postLoginPage(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Login with username: " + username+ " and password: " + password);
}
async function postRegisterPage(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const nickname = req.body.nickname;
    console.log("Register with username: " + username + " and password: " + password + "nickname: " + nickname);
}

module.exports = {
  // GET
  getLoginPage,
  postLoginPage,
  getRegisterPage,
  postRegisterPage,
};