const express = require("express");
const routers = express.Router();
const passport = require("passport");

const gameController = require("./../controller/game.c");
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

module.exports = routers;
