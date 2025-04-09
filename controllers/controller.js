const { Op } = require('sequelize')
const { Profile, User, Cart, CartProduct, Category, Order, OrderDetail, Product, Store } = require('../models')


class Controller{
    static async dashboard(req, res){
        try {
            res.render('admin')
        } catch (error) {
            res.send(error)
        }
    }
    static async landingPage(req, res){
        try {
            res.render('landingpage')
        } catch (error) {
            res.send(error)
        }
    }
    static async getAllProducts(req, res){
        try {
            let data = Product.findAll()

            res.send(data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller