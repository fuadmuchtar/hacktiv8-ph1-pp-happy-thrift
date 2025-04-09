const { Op } = require('sequelize')
const { Profile, User } = require('../models')


class Controller{
    static async testingPage(req, res){
        try {
            res.send('test....... passed!')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller