const express = require("express");
const Router = express.Router();
const SelectController = require("../controles/SelectController");
const UpdateController = require("../controles/UpdateController");
const DeleteController = require("../controles/DeleteController");
const InsertController = require("../controles/InsertController");
const userController = require("../controles/userControles");
// Select
Router.get("/", SelectController.SelectHome);
Router.get("/update/:id", SelectController.SelectUpdate);
// router Update
Router.post("/update/:id", UpdateController.UpdateHome);
// delete
Router.get("/delete/:id",DeleteController.homeDelete);
//Insert
Router.post("/tambah",InsertController.InsertHome);

//login
Router.get("/Login",userController.LoginReedirect);
Router.post("/loginProses",userController.LoginHome);
//logout
Router.get("/logout",userController.LogoutLogin);

module.exports = Router;
