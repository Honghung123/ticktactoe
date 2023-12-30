const express = require("express");
const routers = express.Router();

const gameController = require("./../controller/game.c");
routers.get("/", gameController.homePage); 
routers.get("/create", gameController.createPage); 
routers.get("/rank", gameController.rankPage); 

module.exports = routers;
