const express = require("express");
const Controller = require("../controllers/Controller");
const AuthController = require("../controllers/AuthController");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

// middleware
const access = function(req, res, next){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
    }else{
        next()
    }
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

router.get("/cart", access , Controller.cart);
router.get("/:idproduct/addtocart", access, Controller.addToCart);
router.get("/cart/:idcart/delete/:idproduct", access, Controller.deleteProductCart);
router.get("/cart/:idcart/payment", access, Controller.cartPayment);
router.get("/product/add", access, Controller.testingRoute);
router.post("/product/add", access, Controller.testingRoute);
router.get("/profile", access, Controller.getProfile);
router.post("/profile/update", access, Controller.postProfile);

// admin routes
router.get('/admin', access, AdminController.dashboard)
router.get('/admin/stores', access, AdminController.getAllStores)
router.get('/admin/users', access, AdminController.getAllUsers)

module.exports = router;
