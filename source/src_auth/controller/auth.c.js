const User = require("./../model/user.m");
const {hashPassword, comparePassword, createToken} = require("./../utils/utilityFunctions")

// Login - Register
function getLoginPage(req, res, next) { 
    res.render("login");
}

function getRegisterPage(req, res, next) {
    res.render("register");
}
async function postLoginPage(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findUserByUsername(username);
    if ( await comparePassword(password, user.password)) {
        const dto = {
            username: user.username,
            name: user.name,
            nickname: user.nickname
        }
        const token = createToken(dto);
        res.redirect(`/request?token=${token}`);
    } else {
        res.redirect("/login");
    }
}
async function postRegisterPage(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const nickname = req.body.nickname;
    console.log("Register with username: " + username + " and password: " + password + "nickname: " + nickname);
}

async function getRequestPage(req, res, next) { 
    const token = req.query.token; 
    res.render("request", {token});
}
async function postRequestPage(req, res, next) { 
    const token = req.body.token;
    const maxAge = req.body.maxage; 
    res.redirect('http://localhost:21461');
}

async function findUserByUsername(req, res, next) { 
    const username = req.body.username;
    const user = await User.findUserByUsername(username);
    if (user != null) {
        res.json({
            message: "Username đã tồn tại",
            code: 200
        })
    } else {
        res.json({message: "Username không tồn tại", code: 400})
    }
}

module.exports = {
  // GET
  getLoginPage,
  postLoginPage,
  getRegisterPage,
    postRegisterPage,
    getRequestPage,
  postRequestPage,
  findUserByUsername,
};