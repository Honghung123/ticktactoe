const express = require("express");
const routers = express.Router(); 

const gameController = require("./../controller/game.c");
routers.get("/login", gameController.loginRegisterPage);  

module.exports = routers;
