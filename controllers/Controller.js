const { Op } = require('sequelize')
const { Profile, User, Cart, CartProduct, Category, Order, OrderDetail, Product, Store } = require('../models')
const formatPrice = require('../helpers/helper')


class Controller{
    static async homepage(req, res){
        try {
            console.log(req.session)
            res.render('development/')
        } catch (error) {
            res.send(error)
        }
    }
    static async getClothes(req, res){
        try {
            let data = await Product.getProductsByCategories(Store,1)
            res.render('development/products', {data, formatPrice})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async getPants(req, res){
        try {
            let data = await Product.getProductsByCategories(Store,2)
            res.render('development/products', {data, formatPrice})
        } catch (error) {
            res.send(error)
        }
    }
    static async getAccessories(req, res){
        try {
            let data = await Product.getProductsByCategories(Store,3)
            res.render('development/products', {data, formatPrice})
        } catch (error) {
            res.send(error)
        }
    }
    static async searchProduct(req, res){
        try {
            let {search} = req.query
            let data = await Product.findAll({
                include: Store,
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }}
            )
            let msg = ''
            if(!data) msg = 'There is no match product'
            res.render('development/products', {data, formatPrice})
        } catch (error) {
            res.send(error)
        }
    }
    static async cart(req, res){
        try {
            let userId = req.session.userId
            let data = await Cart.findOne({where: {UserId : userId}, include:[{model:CartProduct, include:[Product]}]})
            console.log(data)
            res.render('development/cart', {data, formatPrice})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async addToCart(req, res){
        try {
            let {idproduct} = req.params
            let userId = req.session.userId
            console.log(req.session)
            // await Cart.addToCart(userId, idproduct)

            let cart = await Cart.findOne({where:{UserId: userId}})
            let item = await Product.findOne({where:{id: idproduct}})

            let data =  await CartProduct.create({
                CartId : cart.id,
                ProductId: item.id,
                quantity: 1,
                totalPrice: item.price
                })

            console.log(data)
            
            res.redirect('/')
            // res.render('development/product', {data})
        } catch (error) {
            console.log(error)
            res.send(error)
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
    static async getCart(req, res){
        try {
            res.render('cart')
        } catch (error) {
            res.send(error)
        }
    }








    static async testingRoute(req, res){
        try {
            res.send('sorry.....feature under construction!')
        } catch (error) {
            res.send
        }
    }
}

module.exports = Controller