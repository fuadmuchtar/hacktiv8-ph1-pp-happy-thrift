const { Op } = require('sequelize')
const { Profile, User, Cart, CartProduct, Category, Order, OrderDetail, Product, Store } = require('../models')

class UserController{
    static login(req, res){
        res.render('auth/login')
    }
    static registerForm(req, res){
        res.render('auth/register')
    }
    static async registerPost(req, res){
        try {
            await User.register(req.body)
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

}

module.exports = UserController