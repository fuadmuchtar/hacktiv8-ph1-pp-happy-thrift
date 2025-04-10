const express = require("express");
const Controller = require("../controllers/Controller");
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

// middleware
const access = function(req, res, next){
    console.log('Time:', Date.now())
    next()
  }

// auth pages
router.get("/register", AuthController.registerForm);
router.post("/register", AuthController.registerPost);
router.get("/login", AuthController.login);
router.post("/auth", AuthController.auth);
router.get("/logout", AuthController.logout)

// home routes
router.get("/", Controller.homepage);
router.get("/clothes", Controller.getClothes);
router.get("/pants", Controller.getPants);
router.get("/accessories", Controller.getAccessories);
router.get("/search", Controller.searchProduct);
router.get("/:idproduct/addtocart", Controller.addToCart);
router.get("/add/product", Controller.formProduct);
router.post("/add/product", Controller.postFormProduct);


router.get('/admin', AdminController.dashboard)
// router.get('/admin/setting', AdminController.testingRoute)
router.get('/admin/stores', AdminController.getAllStores)
router.get('/admin/users', AdminController.getAllUsers)

module.exports = router;
