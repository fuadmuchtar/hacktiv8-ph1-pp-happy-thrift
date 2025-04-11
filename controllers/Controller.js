const { Op } = require("sequelize");
const {
  Profile,
  User,
  Cart,
  CartProduct,
  Category,
  Order,
  OrderDetail,
  Product,
  Store,
} = require("../models");
const formatPrice = require("../helpers/helper");
const qr = require('qrcode')

class Controller {
  static async homepage(req, res) {
    try {
      let { role } = req.session;
      let data = await Product.findAll({
        include: Category,
        limit: 10,
      });
      res.render("landingPage", { data, role, formatPrice });
    } catch (error) {
      res.send(error);
    }
  }

  static async getClothes(req, res) {
    try {
      let { role } = req.session;
      let data = await Product.getProductsByCategories(Category, 1);
      res.render("landingPage", { data, role, formatPrice });
    } catch (error) {
      res.send(error);
    }
  }

  static async getPants(req, res) {
    try {
      let { role } = req.session;
      let data = await Product.getProductsByCategories(Category, 2);
      res.render("landingPage", { data, formatPrice, role });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAccessories(req, res) {
    try {
      let { role } = req.session;
      let data = await Product.getProductsByCategories(Category, 3);
      res.render("landingPage", { data, formatPrice, role });
    } catch (error) {
      res.send(error);
    }
  }

  static async searchProduct(req, res) {
    try {
      let { role } = req.session;
      let { search } = req.query;
      let data = await Product.findAll({
        include: Category,
        limit: 10,
      });
      if (search) {
        data = await Product.findAll({
          include: Category,
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        });
      }
      let msg = "";
      if (!data) msg = "There is no match product";
      res.render("landingPage", { data, formatPrice, role });
    } catch (error) {
      res.send(error);
    }
  }

  static async formProduct(req, res) {
    try {
      let userId = req.session.UserId;
      let stores = await User.findOne({
        where: { id: userId },
        include: Store,
      });

      res.render("addproduct", { StoreId });
    } catch (error) {
      res.send(error);
    }
  }

  static async postFormProduct(req, res) {
    try {
      res.redirect('/')
    } catch (error) {
      res.send(error);
    }
  }

  static async getProfile(req, res) {
    try {
      let data = await Profile.findOne({
        where: { UserId: req.session.UserId },
      });
      let { role } = req.session;
      res.render("profile", { role, data });
    } catch (error) {
      res.send(error);
    }
  }

  static async postProfile(req, res) {
    try {
      let id = req.session.UserId;
      let { firstName, lastName, address, phoneNumber } = req.body;
      await Profile.update(
        { firstName, lastName, address, phoneNumber },
        {
          where: {
            UserId: id,
          },
        }
      );
      res.redirect("/profile");
    } catch (error) {
      res.send(error);
    }
  }

  static async cart(req, res) {
    try {
      let {notif, status} = req.query
      let { role } = req.session;
      let userId = req.session.UserId;
      let data = await Cart.findOne({
        where: { UserId: userId },
        include: [{ model: CartProduct, include: [Product] }],
      });
      let sum = await CartProduct.sum("totalPrice", {
        where: { CartId: data.id },
      });

      qr.toDataURL("https://www.ncsc.gov.uk/images/library/QR-IMAGE.png", (err,src) => {
        res.render("cart", { data, sum, formatPrice, role, notif, qr:src, status });
    })
    } catch (error) {
      res.send(error);
    }
  }

  static async addToCart(req, res) {
    try {
      let { idproduct } = req.params;
      let userId = req.session.UserId;

      
      let cart = await Cart.findOne({ where: { UserId: userId } });
      let item = await Product.findOne({ where: { id: idproduct } });
      
      let cartProduct = await CartProduct.findOne({where: {CartId: cart.id, ProductId: idproduct}})

      if (cartProduct){
        await cartProduct.increment('quantity')
        return res.redirect('/cart')
      }

      await CartProduct.create({
        CartId: cart.id,
        ProductId: item.id,
        quantity: 1,
        totalPrice: item.price,
      });

      res.redirect('/cart')
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteProductCart(req, res) {
    try {
      let { idcart, idproduct } = req.params;
      
      let notif = await Product.findByPk(idproduct);

      let productName = notif.name;

      await CartProduct.destroy({
        where: {
          CartId: idcart,
          ProductId: idproduct
        },
      });
      res.redirect(`/cart?notif=${productName}`)
    } catch (error) {
      res.send(error);
    }
  }
  static async cartPayment(req, res){
    try {
      let {idcart} = req.params
      await CartProduct.destroy({
        where: {
          CartId: idcart,
        },
      });
      res.redirect('/cart?status=success')
    } catch (error) {
      res.send(error)
    }
  }
  
  static async testingRoute(req, res) {
    try {
      res.send("sorry.....feature under maintenance!");
    } catch (error) {
      res.send;
    }
  }
}

module.exports = Controller;
