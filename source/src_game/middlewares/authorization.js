module.exports.authorize = function (req, res, next) {
  console.log(req.user);
  console.log(req.session);
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("Not Authorized!");
    res.redirect("/login");
  }
};