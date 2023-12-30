const express = require("express");
const routers = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
 
const authController = require("../controller/auth.c");
routers.get("/login", authController.getLoginPage);
routers.post("/login", authController.postLoginPage);
routers.get("/register", authController.getRegisterPage); 
routers.post("/register", authController.postRegisterPage); 
routers.get("/request", authController.getRequestPage); 
routers.post("/request", authController.postRequestPage); 

// Validate user
routers.post("/user-validate", authController.findUserByUsername)

module.exports = routers;
