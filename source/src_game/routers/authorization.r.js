const express = require("express");
const routers = express.Router();
const passport = require("passport");


module.exports = function (io) {
  const gameController = require("./../controller/game.c")(io);
  routers.get("/login", gameController.loginRegisterPage);
  routers.get(
    "/authorize",
    passport.authenticate("custom-strategy", {
      successRedirect: "/",
      failureRedirect: "/login",
    }),
    (req, res) => {
      res.redirect("/login");
    }
  );
  return routers;
}
