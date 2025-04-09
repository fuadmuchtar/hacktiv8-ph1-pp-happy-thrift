const { Op } = require('sequelize')
const { Profile, User } = require('../models')


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
}

module.exports = Controller