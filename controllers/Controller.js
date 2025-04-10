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

class Controller {
  static async homepage(req, res) {
    try {
        let {role} = req.session
        if(!role) role = 'guest'
        let data = await Product.findAll({
            include: Category,
            limit: 10
          });
      res.render("fix/landingPage", {data, role, formatPrice});
    } catch (error) {
      res.send(error);
    }
  }
  static async getClothes(req, res) {
    try {
        let {role} = req.session
        if(!role) role = 'guest'
      let data = await Product.getProductsByCategories(Category, 1);
      console.log(data)
      res.render("fix/landingPage", { data, role, formatPrice });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async getPants(req, res) {
    try {
        let {role} = req.session
        if(!role) role = 'guest'
      let data = await Product.getProductsByCategories(Category, 2);
      res.render("fix/landingPage", { data, formatPrice, role });
    } catch (error) {
      res.send(error);
    }
  }
  static async getAccessories(req, res) {
    try {
        let {role} = req.session
        if(!role) role = 'guest'
      let data = await Product.getProductsByCategories(Category, 3);
      res.render("fix/landingPage", { data, formatPrice, role });
    } catch (error) {
      res.send(error);
    }
  }
  static async searchProduct(req, res) {
    try {
        let {role} = req.session
        if(!role) role = 'guest'
      let { search } = req.query;
      let data = await Product.findAll({
        include: Category,
        limit: 10
      });
      if (search){

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
      res.render("fix/landingPage", { data, formatPrice, role });
    } catch (error) {
      res.send(error);
    }
  }
  static async formProduct(req, res){
    try {
        let userId = req.session.userId
        // let stores = await User.findOne({include:Store, where:{UserId:userId}} )
        let stores = await User.findOne({
            where: { id: userId },
            include: Store
          });
          
        console.log(stores)
        res.render('development/addproduct', {StoreId})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
  }
  static async postFormProduct(req, res){
    try {
        console.log(req.body)
        // res.render('development/addproduct')
    } catch (error) {
        res.send(error)
    }
  }
  static async cart(req, res) {
    try {
      let userId = req.session.userId;
      let data = await Cart.findOne({
        where: { UserId: userId },
        include: [{ model: CartProduct, include: [Product] }],
      });
      let sum = await CartProduct.sum("totalPrice", {
                where: { CartId: data.id },
              }); 
      console.log(data);
      res.render("fix/cart", { data, sum, formatPrice });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
//   static async checkOut(req, res) {
//     try {
//       let { idcart } = req.params;
//       let totalPrice = await CartProduct.sum("totalPrice", {
//         where: { CartId: idcart },
//       }); // 50
//       let userId = req.session.userId;

//       await Order.create({
//           UserId: userId,
//           status: 'shipped'
//       })

//       let productId = await CartProduct.findAll({ where: { CartId: idcart } });
//       productId = productId.map((el) => {
//         return el.ProductId;
//       });
//       let products = await Product.findAll({
//         where: {
//           id: {
//             [Op.in]: productId,
//           },
//         },
//       });
//       products = products.map((el) => {
//         let product = el.toJSON(); // konversi ke plain object
//         product.quantity = 1
//         product.ProductId = product.id
//         delete product.id
//         delete product.name;
//         delete product.stock;
//         delete product.description;
//         delete product.StoreId;
//         delete product.CategoryId;

//         return product;
//       });

//       await OrderDetail.bulkCreate(products)
//       //   console.log(products)
//       res.send(products);
//       // await OrderDetail.bulkCreate()
//       // await OrderDetail.create({

//       // })
//       // res.redirect('/orderhistory')
//     } catch (error) {
//       console.log(error);
//       res.send(error);
//     }
//   }

  static async addToCart(req, res) {
    try {
      let { idproduct } = req.params;
      let userId = req.session.userId;
      console.log(req.session);
      // await Cart.addToCart(userId, idproduct)

      let cart = await Cart.findOne({ where: { UserId: userId } });
      let item = await Product.findOne({ where: { id: idproduct } });

      let data = await CartProduct.create({
        CartId: cart.id,
        ProductId: item.id,
        quantity: 1,
        totalPrice: item.price,
      });

      console.log(data);


    //   res.redirect("/");
      res.render('fix/cart', {data})
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  // static async getAllProducts(req, res){
  //     try {
  //         let data = await Product.findAll({include:[{model:Category},{model:Store}]})

  //         console.log(data)
  //         res.render('products', {data})
  //     } catch (error) {
  //         res.send(error)
  //     }
  // }
  static async getCart(req, res) {
    try {
      res.render("cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async testingRoute(req, res) {
    try {
      res.send("sorry.....feature under construction!");
    } catch (error) {
      res.send;
    }
  }
}

module.exports = Controller;
