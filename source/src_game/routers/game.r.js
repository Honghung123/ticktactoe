const express = require("express");
const routers = express.Router();

const gameController = require("./../controller/game.c");
routers.get("/", gameController.homePage); 

module.exports = routers;
