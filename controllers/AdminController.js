const { Op } = require('sequelize')
const { Profile, User, Cart, CartProduct, Category, Order, OrderDetail, Product, Store } = require('../models')

class AdminController{
    static async dashboard(req, res){
        try {
            res.render('admin')
        } catch (error) {
            res.send(error)
        }
    }
    static async getAllStores(req, res){
        try {
            let data = await Store.findAll({include:User})
            res.render('admin/stores', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async getAllUsers(req, res){
        try {
            let data = await User.getUsersNoAdmin()
            res.render('admin/users', {data})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AdminController