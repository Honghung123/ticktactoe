module.exports.authorize = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    // console.log("Not Authorized!");
    res.redirect("/login");
  }
};

//  else if (req.session.hasOwnProperty("user")) {
//     if (req.session.user.isAuthenticated) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   }