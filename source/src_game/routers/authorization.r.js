const express = require("express");
const routers = express.Router();
const authController = require("./../controller/authorizer.c");
const passport = require("passport");

module.exports = function () {
  routers.get("/login", authController.loginRegisterPage);
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
};
