const User = require("./../model/user.m");
const {
  hashPassword,
  comparePassword,
  createToken,
  getUserFromToken, 
} = require("./../utils/utilityFunctions");
const fs = require("fs");
const path = require("path");

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
  if (await comparePassword(password, user.password)) { 
    const token = createToken({ username: user.username }); 
    res.redirect(`/request?token=${token}`);
  } else {
    res.redirect("/login");
  }
}

async function postRegisterPage(req, res, next) {
  const hashedPassword = hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const result = await User.insertUser(req.body);
  if (result) {
    const token = createToken({ username: result.username });
    res.redirect(`/request?token=${token}`);
  } else {
    res.redirect("/login");
  }
}

function getRequestPage(req, res, next) { 
  const token = req.query.token; 
  res.render("request", { token });
}

async function postRequestPage(req, res, next) {
  const token = req.body.token;  
  const user = getUserFromToken(token); 
  const maxAge = req.body.maxage;
  const permissions = req.body.permission; 
  const result = await User.updatePermissions(user.username, permissions, maxAge);  
  if (result) {
    res.redirect(`profile?token=${token}`);
  } else {
    res.redirect(`login`);
  }
}

async function getProfilePage(req, res, next) {
  if (req.query.hasOwnProperty("token")) { 
    const token = req.query.token;
    const username = getUserFromToken(token);
    const entity = await User.findUserByUsername(username.username);
    if (entity) {
      const user = {
        username: entity.username,
        fullname: entity.fullname,
        nickname: entity.nickname,
        avatar: entity.avatar,
        token: token
      } 
      res.render("profile", { user });
    } else {
      res.redirect("login");
    }
  } else {
    res.redirect("login");
  }
}

async function getUpdateProfilePage(req, res, next) {
  if (req.query.hasOwnProperty("token")) { 
    const token = req.query.token;
    const username = getUserFromToken(token);
    const directory = path.join(__dirname, "./../public/uploads");
    const filenameArr = [];
    for (const filename of fs.readdirSync(directory)) {
      filenameArr.push(filename);
    }
    const images = filenameArr.map((file) => {
      return `./src_auth/public/uploads/${file}`;
    });
    const entity = await User.findUserByUsername(username.username);
    if (entity) {
      const user = {
        username: entity.username,
        fullname: entity.fullname,
        nickname: entity.nickname,
        avatar: entity.avatar,
        images,
        token,
      } 
      res.render("update_profile", { user }); 
    } else {
      res.redirect("login");
    }
  } else {
    res.redirect("login");
  }
}

async function postUpdateProfilePage(req, res, next) {
  if (req.body.hasOwnProperty("token")) {
    const user = await User.updateUser(req.body);
    const token = req.body.token;
    if (user) {
      res.redirect(`profile?token=${token}`);
    }
    else {
      res.redirect("login");
    }
  } else {
    res.redirect("login");
  }
}

function getCredentialPage(req, res, next) {
  const token = req.query.token;
  res.render("credential", { token });
}

async function findUserByUsername(req, res, next) {
  const username = req.body.username;
  const user = await User.findUserByUsername(username);
  if (user != null) {
    res.json({
      message: "Username đã tồn tại",
      code: 200,
    });
  } else {
    res.json({ message: "Username không tồn tại", code: 400 });
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
  getProfilePage,
  getUpdateProfilePage,
  postUpdateProfilePage,
  findUserByUsername,
  getCredentialPage,
};
