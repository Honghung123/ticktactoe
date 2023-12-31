const express = require("express");
const routers = express.Router();


module.exports = function(io){
const gameController = require("./../controller/game.c")(io);
  routers.get("/", gameController.homePage);
  routers.get("/create", gameController.createPage);
  routers.get("/rank", gameController.rankPage);
  routers.get("/profile", gameController.profilePage);
  routers.get("/update-profile", gameController.updateProfilePage);
  routers.post("/update-profile", gameController.updateProfile);
  routers.post("/create", gameController.createBoard);
  routers.get("/board/:id", gameController.boardPage);
  routers.get("/logout", gameController.logOut);
  return routers;
};
