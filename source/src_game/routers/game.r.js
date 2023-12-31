const express = require("express");
const routers = express.Router();


module.exports = function(io){
const gameController = require("./../controller/game.c")(io);
  routers.get("/", gameController.homePage);
  routers.get("/create", gameController.createPage);
  routers.get("/rank", gameController.rankPage);
  routers.get("/logout", gameController.logOut);
  return routers;
};
