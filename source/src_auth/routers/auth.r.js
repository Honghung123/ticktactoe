const express = require("express");
const routers = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
 
const authController = require("../controller/auth.c");
routers.get("/login", authController.getLoginPage);
routers.get("/register", authController.getRegisterPage); 
routers.post("/login", authController.postLoginPage);
routers.post("/register", authController.postRegisterPage); 

module.exports = routers;
