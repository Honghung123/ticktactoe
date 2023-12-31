const express = require("express");
const routers = express.Router(); 
 
const authController = require("../controller/auth.c");
routers.get("/login", authController.getLoginPage);
routers.post("/login", authController.postLoginPage);
routers.get("/register", authController.getRegisterPage); 
routers.post("/register", authController.postRegisterPage); 
routers.get("/request", authController.getRequestPage); 
routers.post("/request", authController.postRequestPage); 
routers.get("/profile", authController.getProfilePage); 
routers.get("/update-profile", authController.getUpdateProfilePage); 
routers.post("/update-profile", authController.postUpdateProfilePage); 
routers.get("/credential", authController.getCredentialPage); 

// Validate user
routers.post("/user-validate", authController.findUserByUsername)
routers.post("/get-user-by-token", authController.getUserByToken); 
routers.post("/get-image-src", authController.getImageSource); 
routers.post("/update-user", authController.updateUserInfo);

module.exports = routers;
