module.exports.authorize = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("Not Authorized!");
    res.redirect("/login");
  }
};