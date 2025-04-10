const express = require("express");
const Controller = require("../controllers/Controller");
const admin = express.Router();

admin.get("/", Controller.dashboard);
admin.get("/setting", Controller.testingRoute);
admin.get("/stores", Controller.getAllStores);
admin.get("/users", Controller.getAllUsers);

module.exports = admin;
