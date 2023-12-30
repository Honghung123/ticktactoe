const User = require("./../model/user.m");
const {
  hashPassword,
  comparePassword,
  createToken,
  getUserFromToken,
} = require("./../utils/utilityFunctions");

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
    const dto = {
      username: user.username,
      fullname: user.fullname,
      nickname: user.nickname,
      avatar: user.avatar,
    };
    const token = createToken(dto);
    res.redirect(`/request?token=${token}`);
  } else {
    res.redirect("/login");
  }
}
async function postRegisterPage(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const nickname = req.body.nickname;
  console.log(
    "Register with username: " +
      username +
      " and password: " +
      password +
      "nickname: " +
      nickname +
      " fullname: " +
      fullname
  );
}

function getRequestPage(req, res, next) {
  const token = req.query.token;
  res.render("request", { token });
}
async function postRequestPage(req, res, next) {
  const token = req.body.token;
  const maxAge = req.body.maxage;
  res.redirect(`profile?token=${token}`);
}
function getProfilePage(req, res, next) {
  const token = req.query.token || "";
    const user = getUserFromToken(token);
    user.token = token;
  if (user && token != "") {
    res.render("profile", { user });
  } else {
    res.redirect("login");
  }
}
function getUpdateProfilePage(req, res, next) {
  const token = req.query.token;
  const user = getUserFromToken(token);
    user.images = ["1.png", "2.png", "3.png"].map(file => {
        return `./src_auth/public/uploads/${file}`;
  });
  if (user && token != "") {
    res.render("update_profile", { user });
  } else {
    res.redirect("login");
  }
}
async function postUpdateProfilePage(req, res, next) {
    const user = await User.updateUser(req.body);
    const token = createToken({
        username: user.username,
        nickname: user.nickname,
        fullname: user.fullname,
        avatar: user.avatar
    });
    res.redirect(`profile?token=${token}`);
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
};
